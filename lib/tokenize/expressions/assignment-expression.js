'use strict';

module.exports.AssignmentExpression = (path, {traverse, write}) => {
    if (shouldAddNewLine(path))
        write('\n');
    
    traverse(path.get('left'));
    write(` ${path.node.operator} `);
    traverse(path.get('right'));
};

function shouldAddNewLine({parentPath}) {
    const prevPath = parentPath.getPrevSibling();
    const prevPrevPath = prevPath.getPrevSibling();
    
    const twoPrev = prevPath.node && prevPrevPath.node;
    
    if (!twoPrev)
        return false;
    
    if (prevPath.isExpressionStatement() && prevPath.get('expression').isAssignmentExpression())
        return false;
    
    return true;
}
