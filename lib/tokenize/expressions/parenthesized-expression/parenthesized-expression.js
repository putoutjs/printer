import {types} from '@putout/babel';

const {isJSXElement} = types;

const condition = (path) => {
    const {expression} = path.node;
    return !isJSXElement(expression);
};

export const ParenthesizedExpression = {
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
