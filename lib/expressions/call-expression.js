'use strict';

const {entries} = Object;

module.exports.CallExpression = (path, {traverse, indent, write, maybeWrite}) => {
    if (shouldAddNewLine(path)) {
        write('\n');
        indent();
    }
    
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

function shouldAddNewLine({parentPath}) {
    if (!parentPath.isExpressionStatement())
        return false;
    
    const prevPath = parentPath.getPrevSibling();
    const prevPrevPath = prevPath.getPrevSibling();
    
    const twoPrev = prevPath.node && prevPrevPath.node;
    
    if (!twoPrev)
        return false;
    
    if (prevPath.isExpressionStatement() && prevPath.get('expression').isCallExpression())
        return false;
    
    return true;
}

