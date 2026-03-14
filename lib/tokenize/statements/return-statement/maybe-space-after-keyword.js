import {createTypeChecker} from '#type-checker';

const isSequenceOption = (a, {roundBraces}) => roundBraces.sequence;
const isArrowOption = (a, {roundBraces}) => roundBraces.arrow;
const isNot = (a) => a === '!';

export const maybeSpaceAfterKeyword = (path, {print}, semantics) => {
    const {roundBraces} = semantics;
    const {node} = path;
    
    if (!node)
        return;
    
    if (isOptionalSpace(path, {roundBraces})) {
        print.space();
        return;
    }
    
    print(' ');
};

const isSequenceWithOption = createTypeChecker([
    ['-: -> !SequenceExpression'],
    ['+', isSequenceOption],
]);

const isArrowWithOption = createTypeChecker([
    ['-: -> !ArrowFunctionExpression'],
    ['+', isArrowOption],
]);

const isUnaryNot = createTypeChecker([
    ['-: -> !UnaryExpression'],
    ['+: node.operator', isNot],
]);

const isOptionalSpace = createTypeChecker([
    ['+: -> StringLiteral'],
    ['+: -> TemplateLiteral'],
    ['+: -> ArrayExpression'],
    ['+: -> ObjectExpression'],
    ['+', isUnaryNot],
    ['+', isSequenceWithOption],
    ['+', isArrowWithOption],
]);
