# Printer [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/printer.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/printer "npm"

Prints [**Babel AST**](https://github.com/coderaiser/estree-to-babel) to readable **JavaScript**.

- ☝️ Similar to **Recast**, but simpler and easier in maintenance, since it supports only **Babel**.
- ☝️ As opinionated as **Prettier**, but has more user-friendly output and works directly with **AST**.
- ☝️ Like **ESLint** but without any configuration and plugins 🤷‍, also works directly with **Babel AST** only.

## Install

```
npm i @putout/printer
```

## API

```js
const {print} = require('@putout/printer');
const {parse} = require('@babel/parser');

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

When `path` contains to dashes `__` and name, it is the same as: `print(path.get('right'))`, and this is
actually `traverse(path.get('right'))` shortened to simplify read and process.

Here is how you can override `AssignmentPattern`:

```js
const ast = parse('const {a = 5} = b');

print(ast, {
    format: {
        indent: '    ',
    },
    visitors: {
        AssignmentPattern(path, {print}) {
            print(' /* [hello world] */= ');
            print('__right');
        },
    },
});

// returns
'const {a /* [hello world] */= 5} = b;';
```

## License

MIT
