import {hasTrailingComment} from '#is';
import {
    isListItem,
    callArgComments,
} from '../call-expression/comments.js';
import {
    isFirstProperty,
    printPropertyLeadingCommentLine,
} from '../../comments/comments-printer/property-comments.js';

export const SpreadElement = (path, printer) => {
    const {print} = printer;
    print('...');
    print('__argument');
    
    if (hasTrailingComment(path) && !isListItem(path))
        print(',');
};

SpreadElement.printLeadingCommentLine = (path, printer, semantics, args) => {
    if (isListItem(path))
        return callArgComments.printLeadingCommentLine(path, printer, semantics, args);
    
    return printPropertyLeadingCommentLine(path, printer, semantics, args);
};

SpreadElement.printLeadingCommentBlock = (path, printer, semantics, {index}) => {
    const {print, maybe} = printer;
    const {value} = path.node.leadingComments[index];
    
    maybe.indent(isFirstProperty(path));
    print(`/*${value}*/`);
    print.space();
};
