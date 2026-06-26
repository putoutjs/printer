import {types} from '@putout/babel';
import {maybeParens} from '#maybe-parens';
import {createTypeChecker} from '#type-checker';
import {callWithParent} from '#is';

const {
    isCallExpression,
    isVariableDeclarator,
} = types;

const condition = createTypeChecker([
    ['-', callWithParent(isCallExpression)],
    ['-', callWithParent(isVariableDeclarator)],
    ['+: node.expression -> ObjectExpression'],
]);

export const TSAsExpression = maybeParens({
    condition,
    print: (path, {print}) => {
        print('__expression');
        print(' as ');
        print('__typeAnnotation');
    },
});
