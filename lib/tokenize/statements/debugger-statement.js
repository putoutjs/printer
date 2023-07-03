'use strict';

const {isNext} = require('../is');
const isInsideBlock = (path) => path.parentPath.isBlockStatement();
const isInsideIf = (path) => path.parentPath.isIfStatement();

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
