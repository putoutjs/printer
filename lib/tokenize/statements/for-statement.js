'use strict';

module.exports.ForStatement = (path, {print, maybe, indent}) => {
    const {
        test,
        update,
        body,
    } = path.node;
    
    print('for (');
    print('__init');
    print(';');
    maybe.print(test, ' ');
    print('__test');
    print(';');
    maybe.print(update, ' ');
    print('__update');
    print(')');
    
    if (body.body) {
        print(' ');
        print('__body');
        print.newline();
        
        return;
    }
    
    if (!body.body) {
        print.newline();
        indent.inc();
        print('__body');
        indent.dec();
        print.newline();
    }
};

