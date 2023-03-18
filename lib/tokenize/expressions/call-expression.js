'use strict';

const {
    isMarkedParentBefore,
    isMarkedPrevAfter,
} = require('../mark');

const {entries} = Object;

module.exports.CallExpression = (path, {indent, print, maybe}) => {
    const isParentCall = toLong(path) && path.parentPath.isCallExpression();
    
    if (shouldAddNewLine(path) && !isMarkedParentBefore(path) && !isMarkedPrevAfter(path.parentPath))
        print.linebreak();
    
    print(path.get('callee'));
    print('(');
    
    const args = path.get('arguments');
    const n = args.length - 1;
    
    maybe.indent.inc(isParentCall);
    
    for (const [i, arg] of entries(args)) {
        if (isParentCall) {
            print.newline();
            indent();
        }
        
        print(arg);
        
        if (isParentCall) {
            print(',');
            continue;
        }
        
        maybe.print(i < n, ', ');
    }
    
    if (isParentCall) {
        indent.dec();
        print.newline();
        print.indent();
    }
    
    print(')');
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

