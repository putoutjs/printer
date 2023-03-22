'use strict';

module.exports.AssignmentExpression = (path, {print}) => {
    const {operator} = path.node;
    const left = path.get('left');
    const right = path.get('right');
    
    print(left);
    print(' ');
    print(operator);
    print(' ');
    print(right);
};
