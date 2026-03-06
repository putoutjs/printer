import {createTypeChecker} from '#type-checker';
import {isInsideLabel, isInsideReturn} from '#is';

export const beforeIf = createTypeChecker([
    ['-', isInsideReturn],
    ['+: -> !', isInsideLabel],
]);
