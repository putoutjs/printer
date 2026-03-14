import {types} from '@putout/babel';
import {hasPrevNewline} from '#mark';
import {createTypeChecker} from '#type-checker';
import {
    isInsideLabel,
    noTrailingComment,
    isLast,
    callWithPrev,
} from '#is';
import {maybeSpaceAfterKeyword} from './maybe-space-after-keyword.js';

const {
    isJSXElement,
    isTryStatement,
    isBlockStatement,
} = types;

const isBodyLength = ({parentPath}) => parentPath.node?.body?.length > 2;

const isInsideIfWithElse = createTypeChecker([
    ['-: parentPath -> !IfStatement'],
    ['+: parentPath.node.alternate', Boolean],
]);

const beforeIf = createTypeChecker([
    ['+', callWithPrev(isTryStatement)],
    ['-: ->', hasPrevNewline],
    ['+: ->', isBodyLength],
    ['+: ->', callWithPrev(isBlockStatement)],
]);

export const ReturnStatement = {
    beforeIf,
    before(path, {print}) {
        print.linebreak();
    },
    print(path, printer, semantics) {
        const {maybe, print} = printer;
        
        maybe.indent(!isInsideLabel(path));
        print('return');
        
        const arg = path.get('argument');
        
        maybeSpaceAfterKeyword(arg, printer, semantics);
        
        if (isJSXWithComment(path)) {
            print('(');
            print.breakline();
            print('__argument');
            print(');');
            
            return;
        }
        
        print('__argument');
        print(';');
    },
    afterIf: (path) => {
        if (isInsideIfWithElse(path))
            return true;
        
        if (isLast(path))
            return false;
        
        if (isLast(path.parentPath))
            return false;
        
        return noTrailingComment(path);
    },
    after(path, {print}) {
        print.newline();
    },
};

function isJSXWithComment(path) {
    const arg = path.node.argument;
    
    if (!arg)
        return;
    
    const {leadingComments} = arg;
    
    return isJSXElement(arg) && leadingComments?.length;
}
