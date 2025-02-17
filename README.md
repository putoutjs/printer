# Printer [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMURL]: https://npmjs.org/package/@putout/printer "npm"
[NPMIMGURL]: https://img.shields.io/npm/v/@putout/printer.svg?style=flat&longCache=true
[BuildStatusURL]: https://github.com/putoutjs/printer/actions/workflows/nodejs.yml "Build Status"
[BuildStatusIMGURL]: https://github.com/putoutjs/printer/actions/workflows/nodejs.yml/badge.svg
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[CoverageURL]: https://coveralls.io/github/putoutjs/printer?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/putoutjs/printer/badge.svg?branch=master&service=github

Prints [**Babel AST**](https://github.com/coderaiser/estree-to-babel) to readable **JavaScript**.
Use 🐊[**Putout**](https://github.com/coderaiser/putout) to parse your code.

You may also use [Babel 8](https://github.com/putoutjs/babel) with [`estree-to-babel`](https://github.com/coderaiser/estree-to-babel) for **ESTree** and **Babel AST** to put `.extra.raw` to `.raw` (which is simpler for transforms, no need to use [Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) and add extra values every time).

- ☝️ Similar to **Recast**, but [twice faster](#speed-comparison), also simpler and easier in maintenance, since it supports only **Babel**.
- ☝️ As opinionated as **Prettier**, but has more user-friendly output and works directly with **AST**.
- ☝️ Like **ESLint** but works directly with **Babel AST**.
- ☝️ Easily extendable with help of [Overrides](#overrides).

Supports:

- ✅ **ES2023**;
- ✅ **JSX**;
- ✅ [**TypeScript**](https://www.typescriptlang.org/);
- ✅ [**JSON**](https://github.com/coderaiser/putout/tree/master/packages/processor-json#readme);

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
    "plugins": ["printer"]
}
```

To benefit from it.

## Example

```js
const {print} = require('@putout/printer');
const {parse} = require('putout');
const ast = parse('const a = (b, c) => {const d = 5; return a;}');

print(ast);
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
- `print`, a function to output result of printing into token array;

When `path` contains to dashes `__` and name, it is the same as: `write(path.get('right'))`, and this is
actually `traverse(path.get('right'))` shortened to simplify read and process.

Here is how you can override `AssignmentPattern`:

```js
const ast = parse('const {a = 5} = b');

print(ast, {
    format: {
        indent: '    ',
        newline: '\n',
        space: ' ',
        splitter: '\n',
        quote: `'`,
        endOfFile: '\n',
    },
    semantics: {
        comments: true,
        maxSpecifiersInOneLine: 2,
        maxElementsInOneLine: 3,
        maxLogicalsInOneLine: 3,
        maxVariablesInOneLine: 4,
        maxTypesInOneLine: 3,
        maxPropertiesInOneLine: 2,
        maxPropertiesLengthInOneLine: 15,
        trailingComma: true,
        escapeSingleQuote: true,
        escapeDoubleQuote: false,
        roundBraces: {
            arrow: true,
            sequence: true,
            assign: false,
            new: true,
        },
    },
    visitors: {
        AssignmentPattern(path, {print}) {
            print('/* [hello world] */= ');
            print('__right');
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
        endOfFile: '\n',
    },
};
```

- `indent` - use two spaces, tabs, or anything you want;
- `newline` - symbol used for line separation;
- `space` - default symbol used for space character;
- `splitter` - mandatory symbol that used inside of statements like this:

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

- ✅ `maxElementsInOneLine` - count of `ArrayExpression` and `ArrayPattern` elements placed in one line.
- ✅ `maxLogicalsInOneLine` - count of `LogicalExpression` elements placed in one line.
- ✅ `maxVariablesInOneLine` - count of `VariableDeclarators` in one line.
- ✅ `maxPropertiesInOneLine` - count of `ObjectProperties` in one line.
- ✅ `maxPropertiesLengthInOneLine` - maximum length of `Object Property`, when violated splits event if `maxPropertiesInOneLine` satisfies;
- ✅ `roundBraces` to output braces or not
  - `arrow`: In a  single argument arrow function expressions enabled: `(a) => {}`, disabled: `a => {}`;
  - `sequence`: In sequence expressions: enabled: `for(let e of l) (a(), b())`, disabled: `for(let e of l) a(), b()`;
  - `assign`: In assignment expressions: enabled: `(e.o=w(e.o)`, disabled: `e.o=w(e.o)`;
  - `new`: In new expressions: enabled: `new Date()`, disabled: `new Date`;

## Visitors API

When you want to improve support of existing visitor or extend **Printer** with a new ones, you need next base operations:

### override

When you need to override behavior of existing visitor use:

```js
import {
    print,
    visitors as v,
} from '@putout/printer';

print(ast, {
    visitors: {
        CallExpression(path, printer, semantics) {
            const {print} = printer;
            
            if (!path.node.goldstein)
                return v.CallExpression(path, printer, semantics);
            
            print('__goldstein');
        },
    },
});
```

### `print`

Used in previous example `print` can be used for a couple purposes:

- to write `string`;
- to write `node` when `object` passed;
- to write `node` when `string` started with `__`;

```js
print(ast, {
    visitors: {
        AssignmentPattern(path, {print, maybe}) {
            maybe.write.newline(path.parentPath.isCallExpression());
            print('/* [hello world] */= ');
            print('__right');
        },
    },
});
```

### `maybe`

When you need some condition use `maybe`. For example, to add newline only when parent node is `CallExpression` you
can use `maybe.write.newline(condition)`:

```js
print(ast, {
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

When you going to output string you can use low-level function `write`:

```js
print(ast, {
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
print(ast, {
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

When you need to traverse node path, you can use `traverse`:

```js
print(ast, {
    visitors: {
        AssignmentExpression(path, {traverse}) {
            traverse(path.get('left'));
        },
    },
});
```

This is the same as `print('__left')` but more low-level, and supports only objects.

## Speed Comparison

About speed, for file `speed.js`:

```js
const {readFileSync} = require('node:fs');

const putout = require('putout');
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
            plugins: ['remove-unused-variables'],
        });
    }
    
    console.timeEnd(printer);
}
```

With contents of [`tokenize.js`](https://github.com/putoutjs/printer/blob/v1.69.1/lib/tokenize/tokenize.js), we have:

![image](https://user-images.githubusercontent.com/1573141/234004942-8f890da3-a145-425f-9040-25924dcfba7b.png)

## License

MIT
