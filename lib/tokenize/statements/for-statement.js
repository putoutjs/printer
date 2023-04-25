'use strict';

const {isLast} = require('../is');

module.exports.ForStatement = {
    print(path, {print, maybe, indent}) {
        const {
            test,
            update,
            body,
        } = path.node;
        
        indent();
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
    afterIf(path) {
        if (isLast(path))
            return false;
        
        return true;
    },
    after(path, {print}) {
        print.linebreak();
    },
};

