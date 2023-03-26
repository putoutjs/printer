'use strict';

const {
    isMarkedParentBefore,
    hasPrevNewline,
} = require('../mark');

module.exports.OptionalCallExpression = (path, {indent, print, maybe}) => {
    return CallExpression(path, {
        indent,
        print,
        maybe,
    });
};

const {entries} = Object;

module.exports.CallExpression = CallExpression;

function CallExpression(path, {indent, print, maybe}) {
    const isParentCall = toLong(path) && path.parentPath.isCallExpression();
    
    if (isNewLineBefore(path) && !isMarkedParentBefore(path) && !hasPrevNewline(path.parentPath)) {
        print.breakline();
    }
    
    print('__callee');
    
    if (path.node.optional)
        print('?.');
    
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
}

function isNewLineBefore({parentPath}) {
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
