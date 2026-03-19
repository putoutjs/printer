import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';

const {isArrayExpression} = types;

export const calculateAssigns = (property, semantics) => {
    const currentAssign = isLongAssignPattern(property, semantics);
    
    const {right} = property.node.value;
    const isArrayOrObjectRight = isArrayExpression(right);
    const complexAssign = currentAssign && isArrayOrObjectRight;
    
    return {
        complexAssign,
    };
};

const isMoreThenMaxPropertiesLengthInOneLineOption = (a, {maxPropertiesLengthInOneLine}) => a > maxPropertiesLengthInOneLine;

export const isLongAssignPattern = createTypeChecker([
    ['-: node.value -> !AssignmentPattern'],
    ['+: node.key -> !Identifier'],
    ['+: node.key.name.length', isMoreThenMaxPropertiesLengthInOneLineOption],
]);
