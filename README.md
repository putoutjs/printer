# EasyPrint [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/esengine.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/esengine "npm"

**ESEngine** prints [**Babel AST**](https://github.com/coderaiser/estree-to-babel) to readable **JavaScript**.
- ☝️ Similar to **Recast**, but simpler and easier in maintenance, since it supports only **Babel**.
- ☝️ As opinionated as **Prettier**, but has more user-friendly output and works directly with **AST**.
- ☝️ Like **ESLint** but without any configuration and plugins 🤷‍, also works directly with **Babel AST** only.

## Install

```
npm i easyprint
```

## API

```js
const {print} = require('easyprint');
const {parse} = require('@putout/engine-parser');

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

## License

MIT
