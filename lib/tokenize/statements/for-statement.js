'use strict';

const {exists} = require('../is');

const {markAfter} = require('../mark');

module.exports.ForStatement = {
    print(path, {print, maybe, indent}) {
        const {
            test,
            update,
            body,
        } = path.node;
        
        indent();
        print('for');
        print.space();
        print('(');
        print('__init');
        print(';');
        maybe.print.space(test);
        print('__test');
        
        print(';');
        maybe.print.space(update);
        print('__update');
        print(')');
        
        if (body.body) {
            print.space();
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
        return exists(path.getNextSibling());
    },
    after(path, {print}) {
        print.linebreak();
        markAfter(path);
    },
};
