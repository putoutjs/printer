'use strict';

module.exports.AssignmentExpression = (path, {print}) => {
    const {operator} = path.node;
    print('__left');
    print(' ');
    print(operator);
    print(' ');
    print('__right');
};
