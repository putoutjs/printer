'use strict';

const {isParentBlock, isNextParent} = require('../is');

const insideCase = (path) => path.parentPath.isSwitchCase();

module.exports.BreakStatement = {
    split(path, {print}) {
        print.newline();
    },
    print(path, {print, indent, maybe}) {
        const {label} = path.node;
        indent();
        print('break');
        maybe.print.space(label);
        print('__label');
        print(';');
    },
    afterSatisfy: () => [
        isParentBlock,
        isNextParent,
        insideCase,
    ],
};
