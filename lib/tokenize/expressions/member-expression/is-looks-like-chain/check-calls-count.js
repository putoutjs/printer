import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';

const {isCallExpression} = types;

export const checkCallsCount = (path, {properties}) => {
    const calls = properties.filter(isCallExpression);
    return checkFilteredCalls(calls);
};

const isTwoCallsWithoutName = createTypeChecker([
    ['-: length -> !', '=', 2],
    ['+: 0.name -> -'],
]);

const checkFilteredCalls = createTypeChecker([
    ['-', isTwoCallsWithoutName],
    ['+: length', '>', 1],
]);
