import {types} from '@putout/babel';
import {callWithPrev} from '#is';
import {hasPrevNewline} from '#mark';
import {createTypeChecker} from '#type-checker';

const {
    isTryStatement,
    isBlockStatement,
} = types;

const isBodyLength = ({parentPath}) => parentPath.node?.body?.length > 2;

export const beforeIf = createTypeChecker([
    ['+', callWithPrev(isTryStatement)],
    ['-: ->', hasPrevNewline],
    ['+: ->', isBodyLength],
    ['+: ->', callWithPrev(isBlockStatement)],
]);
