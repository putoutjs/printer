'use strict';

module.exports.DebuggerStatement = (path, {print, indent}) => {
    indent();
    print('debugger;');
    print.newline();
};

