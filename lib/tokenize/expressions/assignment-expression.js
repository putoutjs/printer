'use strict';

const {isObjectPattern} = require('@babel/types');
const {isParens} = require('./unary-expression/parens');

module.exports.AssignmentExpression = {
    condition: (path) => {
        const {left} = path.node;
        
        if (isObjectPattern(left))
            return true;
        
        if (isParens(path))
            return true;
        
        return path.parentPath.isLogicalExpression();
    },
    before(path, {write}) {
        write('(');
    },
    print(path, {print}) {
        const {operator} = path.node;
        
        print('__left');
        print.space();
        print(operator);
        print.space();
        print('__right');
    },
    after(path, {write}) {
        write(')');
    },
};
