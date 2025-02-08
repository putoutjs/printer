'use strict';

const {types} = require('@putout/babel');
const {isJSXElement} = types;

const condition = (path) => {
    const {expression} = path.node;
    return !isJSXElement(expression);
};

module.exports.ParenthesizedExpression = {
    before(path, {print}) {
        print('(');
    },
    condition,
    print(path, {print}) {
        print('__expression');
    },
    after(path, {print}) {
        print(')');
    },
};
