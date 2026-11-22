import {hasTrailingComment} from '#is';
import {
    isFirstProperty,
    printPropertyLeadingCommentLine,
} from '../../comments/comments-printer/property-comments.js';

export const SpreadElement = (path, printer) => {
    const {print} = printer;
    print('...');
    print('__argument');
    
    if (hasTrailingComment(path))
        print(',');
};

SpreadElement.printLeadingCommentLine = printPropertyLeadingCommentLine;

SpreadElement.printLeadingCommentBlock = (path, printer, semantics, {index}) => {
    const {print, maybe} = printer;
    const {value} = path.node.leadingComments[index];
    
    maybe.indent(isFirstProperty(path));
    print(`/*${value}*/`);
    print.space();
};
