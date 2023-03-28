'use strict';

const {isLast} = require('../is');

module.exports.ForStatement = {
    print(path, {print, maybe, indent}) {
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
        } else {
            print.newline();
            indent.inc();
            print('__body');
            indent.dec();
        }
    },
    after(path, {print}) {
        print.newline();
    },
    afterIf(path) {
        if (isLast(path))
            return false;
        
        return true;
    },
};
