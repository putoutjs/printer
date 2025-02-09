'use strict';

const createPrintComment = (fn, value) => () => fn(`//${value}`);

module.exports.hasCommentsPrinter = (currentTraverse) => currentTraverse.printLeadingCommentLine;

module.exports.printComments = (path, printer, semantics, {currentTraverse}) => {
    const {print} = printer;
    const {leadingComments} = path.node;
    const {printLeadingCommentLine} = currentTraverse;
    
    for (const [index, {type, value}] of leadingComments.entries()) {
        if (type === 'CommentLine')
            printLeadingCommentLine(path, printer, semantics, {
                index,
                printComment: createPrintComment(print, value),
            });
    }
};
