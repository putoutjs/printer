'use strict';

const {types} = require('@putout/babel');
const {hasTrailingComment} = require('#is');

const {
    isBlockStatement,
    isProgram,
    isIfStatement,
    isClassMethod,
    isFunction,
} = types;

const isInsideFunction = ({parentPath}) => isFunction(parentPath.parentPath);

module.exports.printLeadingCommentLine = (path, printer, semantics, {index, isLast, printComment}) => {
    const {print, indent} = printer;
    const prev = path.getPrevSibling();
    const {parentPath} = path;
    const parentParentPath = parentPath.parentPath;
    
    if (hasTrailingComment(prev))
        return;
    
    if (!index && !prev.node && (isIfStatement(parentPath) || isInsideFunction(path)))
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

