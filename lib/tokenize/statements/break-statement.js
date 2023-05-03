'use strict';

const {
    isParentBlock,
    isNextParent,
} = require('../is');

const insideCase = (path) => path.parentPath.isSwitchCase();

module.exports.BreakStatement = {
    split(path, {print}) {
        print.newline();
    },
    print(path, {print, indent}) {
        indent();
        print('break;');
    },
    afterIf(path) {
        if (isParentBlock(path))
            return true;
        
        if (isNextParent(path))
            return true;
        
        return insideCase(path);
    },
};
