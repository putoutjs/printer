'use strict';

const {
    isNext,
    isParentBlock,
    isNextParent,
} = require('../is');

module.exports.BreakStatement = {
    split(path, {print}) {
        print.newline();
    },
    print(path, {print, indent}) {
        indent();
        print('break;');
    },
    afterIf(path) {
        if (!isNext(path) && !isParentBlock(path) && !isNextParent(path))
            return false;
        
        return true;
    },
};
