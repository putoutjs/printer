import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {hasPrevNewline} from '#mark';
import {callWithPrev, isFirst} from '#is';

const {isBlockStatement} = types;

export const beforeIf = createTypeChecker([
    ['-', isFirst],
    ['-', hasPrevNewline],
    ['-: parentPath ->', hasPrevNewline],
    ['+', callWithPrev(isBlockStatement)],
]);
