'use strict';

module.exports.CallExpression = (path, {traverse, write}) => {
    const prevPath = path.parentPath.getPrevSibling();
    const prevPrevPath = prevPath.getPrevSibling();
    
    if (!isCallInsideExpression(prevPath) && !isCallInsideExpression(prevPrevPath))
        write('\n');
    
    traverse(path.get('callee'));
    write('(');
    path.get('arguments').forEach(traverse);
    write(')');
};

function isCallInsideExpression(path) {
    if (!path.node)
        return true;
    
    return path.get('expression').isCallExpression();
}
