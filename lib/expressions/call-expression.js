'use strict';

const {entries} = Object;

module.exports.CallExpression = (path, {traverse, write, maybeWrite}) => {
    if (isTwoPrevCalls(path))
        write('\n');
    
    traverse(path.get('callee'));
    write('(');
    
    const args = path.get('arguments');
    const n = args.length - 1;
    
    for (const [i, arg] of entries(args)) {
        traverse(arg);
        maybeWrite(i < n, ', ');
    }
    
    write(')');
};

function isTwoPrevCalls(path) {
    const prevPath = path.parentPath.getPrevSibling();
    const prevPrevPath = prevPath.getPrevSibling();
    
    if (isCallInsideExpression(prevPath))
        return false;
    
    if (isCallInsideExpression(prevPrevPath))
        return false;
    
    return true;
}

function isCallInsideExpression(path) {
    if (!path.node)
        return true;
    
    return path.get('expression').isCallExpression();
}

