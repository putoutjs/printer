import {createTypeChecker} from '#type-checker';
import {isNextAssignObject} from './is.js';

const isMoreThenMaxPropertiesLengthInOneLineOption = (a, {semantics}) => {
    const {maxPropertiesLengthInOneLine} = semantics;
    return a > maxPropertiesLengthInOneLine;
};

const isCoupleOption = (a, {couple}) => couple;

const isNextAssignAndCurrentNotAssign = createTypeChecker([
    ['-: ->', isCoupleOption],
    ['+: node.value -> AssignmentPattern'],
    ['+: -> !', isNextAssignObject],
]);

export const isBreaklineBeforeProperty = createTypeChecker([
    ['-: ->', isNextAssignAndCurrentNotAssign],
    ['+: node.key.name.length -> !', isMoreThenMaxPropertiesLengthInOneLineOption],
]);
