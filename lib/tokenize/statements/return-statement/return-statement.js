import {types} from '@putout/babel';
import {
    isInsideLabel,
    isPrevBody,
    noTrailingComment,
    isLast,
} from '#is';
import {hasPrevNewline} from '../../mark.js';
import {maybeSpaceAfterKeyword} from './maybe-space-after-keyword.js';

const {isJSXElement} = types;
const isBodyLength = ({parentPath}) => parentPath.node?.body?.length > 2;

const isInsideIfWithElse = ({parentPath}) => parentPath.isIfStatement() && parentPath.node.alternate;

export const ReturnStatement = {
    beforeIf(path) {
        return !hasPrevNewline(path) && isBodyLength(path) || isPrevBody(path);
    },
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
