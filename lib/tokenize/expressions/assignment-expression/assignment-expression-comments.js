import {types} from '@putout/babel';
import {hasLeadingComment} from '#is';

const {isReturnStatement} = types;

export const printLeadingCommentLine = (path, printer, semantics, {printComment, isLast}) => {
    const {parentPath} = path;
    const {print, maybe} = printer;
    
    if (isReturnStatement(parentPath))
        return;
    
    maybe.print.breakline(!isLast);
    printComment();
    print.breakline();
};

export const printLeadingCommentBlock = (path, printer, semantics, {printComment}) => {
    const {parentPath} = path;
    const {print} = printer;
    
    if (isReturnStatement(parentPath))
        return;
    
    printComment();
    print.indent();
};

export const maybeInsideReturnWithCommentStart = (path, {print, indent}) => {
    const {parentPath} = path;
    const is = isReturnStatement(parentPath);
    
    if (is && hasLeadingComment(path)) {
        indent.inc();
        const {leadingComments} = path.node;
        
        print.breakline();
        for (const {type, value} of leadingComments) {
            if (type === 'CommentLine')
                print(`//${value}`);
            else
                print(`/*${value}*/`);
            
            print.breakline();
        }
    }
};

export const maybeInsideReturnWithCommentEnd = (path, {print, indent}) => {
    const {parentPath} = path;
    const is = isReturnStatement(parentPath);
    
    if (!is || !hasLeadingComment(path))
        return;
    
    indent.dec();
    print.breakline();
};
