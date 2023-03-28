'use strict';

const {isLast} = require('../is');

module.exports.WhileStatement = (path, {print, indent}) => {
    print('while (');
    print('__test');
    print(')');
    
    if (path.node.body.body) {
        print(' ');
        print('__body');
    } else {
        indent.inc();
        print.newline();
        print('__body');
        indent.dec();
    }
    
    if (shouldAddNewlineAfter(path)) {
        print.linebreak();
    }
};

function shouldAddNewlineAfter(path) {
    if (isLast(path))
        return false;
    
    return true;
}
