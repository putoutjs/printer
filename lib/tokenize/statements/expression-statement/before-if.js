import {createTypeChecker} from '#type-checker';
import {
    isInsideLabel,
    isInsideReturn,
    noTrailingComment,
} from '#is';

export const beforeIf = createTypeChecker([
    ['-', isInsideReturn],
    ['+: -> !', isInsideLabel],
]);
