'use strict';

const {isObjectPattern} = require('@babel/types');

module.exports.AssignmentExpression = {
    condition: (path) => isObjectPattern(path.node.left),
    before(path, {write}) {
        write('(');
    },
    print(path, {print}) {
        const {operator} = path.node;
        print('__left');
        print(' ');
        print(operator);
        print(' ');
        print('__right');
    },
    after(path, {write}) {
        write(')');
    },
};

