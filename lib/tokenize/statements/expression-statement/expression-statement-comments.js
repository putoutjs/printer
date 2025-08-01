'use strict';

const {types} = require('@putout/babel');
const {hasTrailingComment} = require('#is');

const {
    isBlockStatement,
    isProgram,
    isIfStatement,
} = types;

module.exports.printLeadingCommentLine = (path, printer, semantics, {index, isLast, printComment}) => {
    const {print, indent} = printer;
    const prev = path.getPrevSibling();
    const {parentPath} = path;
    
    if (hasTrailingComment(prev))
        return;
    
    if (!index && !prev.node && (isIfStatement(parentPath) || isBlockStatement(parentPath)))
        indent();
    
    printComment();
    print.newline();
    
    if (!isLast && !path.parentPath.isIfStatement())
        print.indent();
};

module.exports.printLeadingCommentBlock = (path, printer, semantics, {printComment}) => {
    const {indent} = printer;
    const prev = path.getPrevSibling();
    
    if (hasTrailingComment(prev))
        return;
    
    if (isBlockStatement(path.parentPath) && !isProgram(path.parentPath.parentPath))
        indent();
    
    printComment();
};
