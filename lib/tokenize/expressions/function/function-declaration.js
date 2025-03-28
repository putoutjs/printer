'use strict';

const {types} = require('@putout/babel');
const {markAfter} = require('../../mark');
const {isNext, isNextParent} = require('../../is');
const {printParams} = require('./params');

const not = (fn) => (...a) => !fn(...a);
const notInsideExportDefaultWithBody = not(isInsideExportDefaultWithBody);

const {
    isAssignmentExpression,
    isTSModuleBlock,
    isBlockStatement,
    isExportNamedDeclaration,
    isExpressionStatement,
    isFunctionDeclaration,
    isExportDefaultDeclaration,
} = types;

const isInsideNamedExport = ({parentPath}) => isExportNamedDeclaration(parentPath);

module.exports.FunctionDeclaration = {
    print(path, printer, semantics) {
        const {print, maybe} = printer;
        
        const {
            async,
            generator,
            returnType,
        } = path.node;
        
        maybe.indent(!isInsideNamedExport(path));
        maybe.print(async, 'async ');
        
        print('function');
        
        if (!generator) {
            print(' ');
        } else {
            print('*');
            print.space();
        }
        
        print('__id');
        printParams(path, printer, semantics);
        
        if (returnType) {
            print(': ');
            print('__returnType');
        }
        
        print.space();
        print('__body');
    },
    afterSatisfy: () => [isNext, isNextParent, isInsideBlockStatement],
    after(path, {indent, maybe}) {
        if (isNextAssign(path) || isNextFunction(path) || isNext(path))
            indent();
        
        maybe.write.newline(notInsideExportDefaultWithBody(path));
        markAfter(path);
    },
};

const isNextFunction = (path) => {
    const next = path.getNextSibling();
    return isFunctionDeclaration(next);
};

const isNextAssign = (path) => {
    const next = path.getNextSibling();
    
    if (!isExpressionStatement(next))
        return false;
    
    return isAssignmentExpression(next.node.expression);
};

function isInsideBlockStatement(path) {
    const {parentPath} = path;
    
    if (isTSModuleBlock(parentPath.parentPath))
        return true;
    
    if (!isBlockStatement(parentPath))
        return false;
    
    return !path.node.body.body.length;
}

function isInsideExportDefaultWithBody(path) {
    if (!isExportDefaultDeclaration(path.parentPath))
        return false;
    
    return path.node.body.body.length;
}
