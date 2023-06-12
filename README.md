# Printer [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/printer.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/printer "npm"

Prints [**Babel AST**](https://github.com/coderaiser/estree-to-babel) to readable **JavaScript**.

- ☝️ Similar to **Recast**, but [twice faster](#speed-comparison), also simpler and easier in maintenance, since it supports only **Babel**.
- ☝️ As opinionated as **Prettier**, but has more user-friendly output and works directly with **AST**.
- ☝️ Like **ESLint** but works directly with **Babel AST**.
- ☝️ Easily extandable with help of [Overrides](h#overrides).

Supports:

- ✅ **ES2023**;
- ✅ **JSX**;
- ✅ **TypeScript**;

## Install

```
npm i @putout/printer
```

## 🐊 Support of Printer

**Printer** has first class support from 🐊**Putout** with help of [`@putout/plugin-printer`](https://github.com/coderaiser/putout/tree/master/packages/plugin-printer#putoutplugin-printer-). So install:

```sh
npm i @putout/plugin-printer -aD
```

And update `.putout.json`:

```json
{
    "printer": "putout",
    "plugins": [
        "printer"
    ]
}
```

To benefit from it.

## API

```js
const {write} = require('@putout/printer');
const {parse} = require('@babel/parser');
const ast = parse('const a = (b, c) => {const d = 5; return a;}');

write(ast);
// returns
`
const a = (b, c) => {
    const d = 5;
    return a;
};
`;
```

## Overrides

When you need to extend syntax of `@putout/printer` just pass a function which receives:

- `path`, Babel Path
- `write`, a function to output result of printing into token array;

When `path` contains to dashes `__` and name, it is the same as: `write(path.get('right'))`, and this is
actually `traverse(path.get('right'))` shortened to simplify read and process.

Here is how you can override `AssignmentPattern`:

```js
const ast = parse('const {a = 5} = b');

write(ast, {
    format: {
        indent: '    ',
        newline: '\n',
        space: ' ',
        splitter: '\n',
        roundBraceOpen: '(',
        roundBraceClose: ')',
    },
    semantics: {
        comments: true,
        maxSpecifiersInOneLine: 2,
        maxElementsInOneLine: 3,
        maxVariablesInOneLine: 4,
    },
    visitors: {
        AssignmentPattern(path, {write}) {
            write('/* [hello world] */= ');
            write('__right');
        },
    },
});

// returns
'const {a/* [hello world] */= 5} = b;\n';
```

### `format`

Options related to visuals and not related to logic of output can be changed with help of `format`,
you can override next options:

```js
const overrides = {
    format: {
        indent: '    ',
        newline: '\n',
        space: ' ',
        splitter: '\n',
        roundBraceOpen: '(',
        roundBraceClose: ')',
    },
};
```

- `indent` - use two spaces, tabs, or anything you want;
- `newline` - symbol for used for line separation;
- `space` - default symbol used for space character;
- `splitter` - mandatory symbol that used inside of statements like this:
- `roundBraceOpen` and `roundBraceClose` symbols to to output braces in a  single argument arrow function expressions: `(a) => {}`.

Default options produce:

```js
if (a > 3)
    console.log('ok');
else
    console.log('not ok');
```

But you can override them with:

```js
const overrides = {
    format: {
        indent: '',
        newline: '',
        space: '',
        splitter: ' ',
    },
};
```

And have minified code:

```
if(a>3)console.log('ok');else console.log('not ok');
```

### Semantics

Options used to configure logic of output, similar to ESLint rules:

```js


```

### `write`

Used in previous example `write` can be used for a couple purposes:

- to write `string`;
- to write `node` when `object` passed;
- to write `node` when `string` started with `__`;

```js
write(ast, {
    visitors: {
        AssignmentPattern(path, {write, maybe}) {
            maybe.write.newline(path.parentPath.isCallExpression());
            write('/* [hello world] */= ');
            write('__right');
        },
    },
});
```

### `maybe`

When you need some condition use `maybe`. For example, to add newline only when parent node is `CallExpression` you
can use `maybe.write.newline(condition)`:

```js
write(ast, {
    visitors: {
        AssignmentPattern(path, {write, maybe}) {
            maybe.write.newline(path.parentPath.isCallExpression());
            write(' /* [hello world] */= ');
            write('__right');
        },
    },
});
```

### `write`

When are you going to output string you can use low-level function `write`:

```js
write(ast, {
    visitors: {
        BlockStatement(path, {write}) {
            write('hello');
        },
    },
});
```

### `indent`

When you need to add indentation use `indent`, for example when you output body,
you need to increment indentation, and then decrement it back:

```js
write(ast, {
    visitors: {
        BlockStatement(path, {write, indent}) {
            write('{');
            indent.inc();
            indent();
            write('some;');
            indent.dec();
            write('{');
        },
    },
});
```

### `traverse`

When are you needing to traverse node, you can use `traverse`:

```js
write(ast, {
    visitors: {
        AssignmentExpression(path, {traverse}) {
            traverse(path.get('left'));
        },
    },
});
```

This is the same as `write('__left')` but more low-level, and supports only objects.

## Speed Comparison

About speed, for file `speed.js`:

```js
const putout = require('putout');
const {readFileSync} = require('fs');
const parser = require('@babel/parser');

const code = readFileSync('./lib/tokenize/tokenize.js', 'utf8');
const ast = parser.parse(code);

speed('recast');
speed('putout');

function speed(printer) {
    console.time(printer);
    
    for (let i = 0; i < 1000; i++) {
        putout(code, {
            printer,
            plugins: [
                'remove-unused-variables',
            ],
        });
    }
    
    console.timeEnd(printer);
}
```

With contents of [`tokenize.js`](https://github.com/putoutjs/printer/blob/v1.69.1/lib/tokenize/tokenize.js), we have:

![image](https://user-images.githubusercontent.com/1573141/234004942-8f890da3-a145-425f-9040-25924dcfba7b.png)

## License

MIT
