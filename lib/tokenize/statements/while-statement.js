'use strict';

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
    
    print.linebreak();
};
