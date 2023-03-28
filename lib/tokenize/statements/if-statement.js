'use strict';

const {hasPrevNewline, markAfter} = require('../mark');
const {isFirst} = require('../is');

module.exports.IfStatement = (path, {indent, print}) => {
    if (shouldAddNewlineBefore(path)) {
        print.linebreak();
    }
    
    indent();
    print('if (');
    print('__test');
    print(')');
    
    const consequent = path.get('consequent');
    const alternate = path.get('alternate');
    
    if (consequent.isBlockStatement()) {
        print(' ');
        print(consequent);
    } else {
        print.newline();
        indent.inc();
        print(consequent);
        indent.dec();
    }
    
    if (alternate.isBlockStatement()) {
        print(' else ');
        print(alternate);
    } else if (alternate.node) {
        print.breakline();
        print('else');
        print.newline();
        indent.inc();
        print(alternate);
        indent.dec();
    }
    
    const next = path.getNextSibling();
    
    if (!next.node || next.isExpressionStatement() || next.isReturnStatement())
        return;
    
    print.indent();
    print.newline();
    markAfter(path);
};

function shouldAddNewlineBefore(path) {
    return !isFirst(path) && !hasPrevNewline(path);
}
