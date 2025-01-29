'use strict';

const {isNext, isInsideIf} = require('../is');
const isInsideBlock = (path) => path.parentPath.isBlockStatement();

module.exports.DebuggerStatement = {
    print(path, {print, indent}) {
        indent();
        print('debugger;');
    },
    afterSatisfy: () => [
        isNext,
        isInsideBlock,
        isInsideIf,
    ],
    after(path, {print}) {
        print.newline();
    },
};
