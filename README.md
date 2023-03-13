# @putout/engine-printer [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/engine-printer.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/engine-printer "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) engine that prints `AST`.

## Install

```
npm i @putout/engine-printer
```

```js
const {print} = require('@putout/engine-printer');
const {parse} = require('@putout/engine-parser');

const ast = parse('const a = (b, c) => {const d = 5; return a;}');
print(ast);
`
const a = (b, c) => {
    const d = 5;
    return a;
};
`
```

## License

MIT
