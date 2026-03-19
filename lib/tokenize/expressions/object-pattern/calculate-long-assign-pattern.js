import {createTypeChecker} from '#type-checker';

const isMoreThenMaxPropertiesLengthInOneLineOption = (a, {maxPropertiesLengthInOneLine}) => a > maxPropertiesLengthInOneLine;

export const isLongAssignPattern = createTypeChecker([
    ['-: node.value -> !AssignmentPattern'],
    ['+: node.key.name.length', isMoreThenMaxPropertiesLengthInOneLineOption],
]);

