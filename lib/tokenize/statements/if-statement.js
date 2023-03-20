'use strict';

const {hasPrevNewline, markAfter} = require('../mark');
const {isFirst} = require('../is');

module.exports.IfStatement = (path, {write, indent, traverse, incIndent, decIndent, print}) => {
    if (!isFirst(path) && !hasPrevNewline(path)) {
        print.indent();
        print.newline();
    }
    
    indent();
    print('if (');
    print(path.get('test'));
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

