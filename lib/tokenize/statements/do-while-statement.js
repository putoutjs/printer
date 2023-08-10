'use strict';

const {isLast} = require('../is');
const notLast = (path) => !isLast(path);

module.exports.DoWhileStatement = {
    print(path, {print, indent}) {
        indent();
        print('do');
        print.space();
        print('__body');
        print.space();
        print('while ');
        print('(');
        print('__test');
        print(')');
    },
    afterSatisfy: () => [notLast],
    after(path, {print}) {
        print.newline();
    },
};
