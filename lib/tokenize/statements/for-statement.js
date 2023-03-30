'use strict';

const {isLast} = require('../is');

module.exports.ForStatement = {
    print(path, {print, maybe}) {
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
            const is = !path.get('body').isEmptyStatement();
            
            maybe.print.newline(is);
            maybe.indent.inc(is);
            print('__body');
            maybe.indent.dec(is);
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
