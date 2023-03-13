'use strict';

module.exports.AssignmentExpression = (path, {traverse, write}) => {
    if (isTwoPrevAssignments(path))
        write('\n');
    
    traverse(path.get('left'));
    write(` ${path.node.operator} `);
    traverse(path.get('right'));
};

function isTwoPrevAssignments({parentPath}) {
    if (!parentPath)
        return false;
    
    const prevPath = parentPath.getPrevSibling();
    const prevPrevPath = prevPath.getPrevSibling();
    
    if (isAssignInsideExpression(prevPath))
        return false;
    
    if (isAssignInsideExpression(prevPrevPath))
        return false;
    
    return true;
}

function isAssignInsideExpression(path) {
    if (!path.node)
        return true;
    
    return path.get('expression').isAssignmentExpression();
}

