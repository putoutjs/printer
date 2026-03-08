import {isNextObject} from '#is';
import {createTypeChecker} from '#type-checker';

const SIMPLE_TYPES = [
    'ArrayExpression',
    'ObjectExpression',
    'SpreadElement',
    'CallExpression',
    'Identifier',
    'NewExpression',
];

const isSimpleType = ({type}) => SIMPLE_TYPES.includes(type);

export const isObjectAfterSimple = createTypeChecker([
    ['-: -> !', isNextObject],
    ['+', isSimpleType],
]);
