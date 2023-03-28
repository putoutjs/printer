'use strict';

const {
    isMarkedParentBefore,
    hasPrevNewline,
} = require('../mark');

const {entries} = Object;

const CallExpression = {
    beforeIf(path) {
        return isNewLineBefore(path) && !isMarkedParentBefore(path) && !hasPrevNewline(path.parentPath);
    },
    before(path, {print}) {
        print.breakline();
    },
    print(path, {indent, print, maybe}) {
        const isParentCall = toLong(path) && path.parentPath.isCallExpression();
        
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
    },
};

module.exports.OptionalCallExpression = CallExpression;

module.exports.CallExpression = CallExpression;

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
