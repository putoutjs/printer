'use strict';

const {isCoupleLines} = require('../is');

module.exports.JSXAttribute = {
    condition(path) {
        return isCoupleLines(path.parentPath);
    },
    before(path, {print, indent}) {
        indent.inc();
        print.breakline();
    },
    print(path, {print, maybe}) {
        const {value} = path.node;
        
        print('__name');
        maybe.print(value, '=');
        print('__value');
    },
    after(path, {indent}) {
        indent.dec();
    },
};
