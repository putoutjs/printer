'use strict';

const {
    isMarkedParentBefore,
    isMarkedPrevAfter,
} = require('../mark');

const {entries} = Object;

module.exports.CallExpression = (path, {traverse, indent, write, incIndent, decIndent, maybeWrite}) => {
    const isParentCall = toLong(path) && path.parentPath.isCallExpression();
    
    if (shouldAddNewLine(path) && !isMarkedParentBefore(path) && !isMarkedPrevAfter(path.parentPath))
        write.linebreak();
    
    traverse(path.get('callee'));
    write('(');
    
    const args = path.get('arguments');
    const n = args.length - 1;
    
    if (isParentCall)
        incIndent();
    
    for (const [i, arg] of entries(args)) {
        if (isParentCall) {
            write.newline();
            indent();
        }
        
        traverse(arg);
        
        if (isParentCall) {
            write(',');
            continue;
        }
        
        maybeWrite(i < n, ', ');
    }
    
    if (isParentCall) {
        decIndent();
        write.newline();
        write.indent();
    }
    
    write(')');
};

function shouldAddNewLine({parentPath}) {
    if (!parentPath.isExpressionStatement())
        return false;
    
    const prevPath = parentPath.getPrevSibling();
    const prevPrevPath = prevPath.getPrevSibling();
    
    if (prevPath.isStatement() && !prevPath.isExpressionStatement() && !prevPath.isVariableDeclaration())
        return true;
    
    const twoPrev = prevPath.node && prevPrevPath.node;
    
    if (!twoPrev)
        return false;
    
    if (prevPath.isExpressionStatement() && prevPath.get('expression').isCallExpression())
        return false;
    
    return true;
}

function toLong(path) {
    const args = path.get('arguments');
    
    for (const arg of args) {
        if (arg.isIdentifier() && arg.node.name.length > 5)
            return true;
    }
    
    return false;
}

