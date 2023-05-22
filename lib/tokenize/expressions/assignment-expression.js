'use strict';

const {isObjectPattern} = require('@babel/types');

module.exports.AssignmentExpression = {
    condition: (path) => {
        const {
            left,
            extra,
        } = path.node;
        
        if (isObjectPattern(left))
            return true;
        
        if (extra?.parenthesized)
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
