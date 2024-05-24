'use strict';

const {isObjectPattern} = require('@putout/babel').types;
const {isParens} = require('../unary-expression/parens');
const {isCoupleLines} = require('../../is');
const {isMarkedAfter} = require('../../mark');

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
    print(path, {print, maybe}) {
        const {operator} = path.node;
        maybe.print.breakline(isPrevCoupleLines(path));
        
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

const isPrevCoupleLines = ({parentPath}) => {
    const prev = parentPath.getPrevSibling();
    
    if (isMarkedAfter(prev))
        return false;
    
    if (!prev.node)
        return false;
    
    return isCoupleLines(prev);
};
