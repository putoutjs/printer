'use strict';

const {isLast} = require('../is');
const {markAfter} = require('../mark');

module.exports.WhileStatement = {
    print(path, {print, indent}) {
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
        if (isLast(path))
            return false;
        
        return true;
    },
    after(path, {print}) {
        print.linebreak();
        markAfter(path);
    },
};

