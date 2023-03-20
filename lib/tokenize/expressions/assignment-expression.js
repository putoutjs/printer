'use strict';

module.exports.AssignmentExpression = (path, {print}) => {
    const {operator} = path.node;
    const left = path.get('left');
    const right = path.get('right');
    
    if (shouldAddNewLine(path))
        print('\n');
    
    print(left);
    print(' ');
    print(operator);
    print(' ');
    print(right);
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
