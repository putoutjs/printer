'use strict';

const {
    concatenate,
    isConcatenation,
} = require('./concatenate');

const {maybeSpace} = require('./maybe-space');
const {maybeParens} = require('../../maybe/maybe-parens');

module.exports.BinaryExpression = maybeParens((path, {print, indent, maybe}) => {
    const {operator} = path.node;
    
    if (operator === 'in' || operator === 'instanceof') {
        print('__left');
        print(' ');
        print(operator);
        print(' ');
        print('__right');
        
        return;
    }
    
    if (isConcatenation(path))
        return concatenate(path, {
            print,
            indent,
            maybe,
        });
    
    print('__left');
    print.space();
    print(path.node.operator);
    maybeSpace(path, {
        print,
    });
    print('__right');
});
