'use strict';

const {isNext} = require('../is');
const {markAfter} = require('../mark');

module.exports.WhileStatement = {
    print(path, {print, indent}) {
        indent();
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
    },
    afterIf(path) {
        return isNext(path);
    },
    after(path, {print}) {
        print.linebreak();
        markAfter(path);
    },
};
