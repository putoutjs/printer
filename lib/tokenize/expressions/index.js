export * from './function/functions.js';
export * from './unary-expression/unary-expressions.js';
export * from './member-expression/member-expressions.js';
export {
    ClassExpression,
    ClassDeclaration,
} from './class/class.js';
export {
    CallExpression,
    OptionalCallExpression,
} from './call-expression/call-expression.js';
export {NewExpression} from './new-expression/new-expression.js';
export {ObjectExpression} from './object-expression/object-expression.js';
export {ObjectProperty} from './object-expression/object-property.js';
export {ObjectPattern} from './object-pattern/object-pattern.js';
export {AssignmentExpression} from './assignment-expression/assignment-expression.js';
export {ArrayExpression} from './array-expression/array-expression.js';
export {ArrayPattern} from './array-pattern/array-pattern.js';
export {AssignmentPattern} from './assignment-pattern.js';
export {RestElement} from './rest-element.js';
export {SpreadElement} from './spread-element.js';
export {SequenceExpression} from './sequence-expression/sequence-expression.js';
export {TaggedTemplateExpression} from './tagged-template-expression.js';
export {BinaryExpression} from './binary-expression/binary-expression.js';
export {LogicalExpression} from './logical-expression/logical-expression.js';
export {ConditionalExpression} from './conditional-expression.js';
export {StaticBlock} from './class/static-block.js';
export {ImportExpression} from './import-expression.js';
export {ParenthesizedExpression} from './parenthesized-expression/parenthesized-expression.js';
export {
    ClassProperty,
    ClassAccessorProperty,
    ClassPrivateProperty,
    PrivateName,
} from './class/class-property.js';

export const ThisExpression = (path, {write}) => {
    write('this');
};
