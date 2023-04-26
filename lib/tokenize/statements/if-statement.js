'use strict';

const {markAfter} = require('../mark');
const {exists} = require('../is');

const isEmptyConsequent = (path) => path.get('consequent').isEmptyStatement();

module.exports.IfStatement = {
    print: (path, {indent, print, maybe, write, traverse}) => {
        indent();
        print('if (');
        print('__test');
        print(')');
        
        const consequent = path.get('consequent');
        const alternate = path.get('alternate');
        const isConsequentBlock = consequent.isBlockStatement();
        
        if (isConsequentBlock) {
            print(' ');
            print(consequent);
        } else {
            const is = !isEmptyConsequent(path);
            maybe.print.newline(is);
            maybe.indent.inc(is);
            print(consequent);
            maybe.indent.dec(is);
        }
        
        if (alternate.isBlockStatement()) {
            write(' else ');
            traverse(alternate);
        } else if (alternate.isIfStatement()) {
            write.space();
            write('else');
            write.space();
            traverse(alternate);
        } else if (exists(alternate)) {
            maybe.indent(!isConsequentBlock);
            write('else');
            print.newline();
            indent.inc();
            traverse(alternate);
            indent.dec();
        }
    },
    afterIf: (path) => {
        const next = path.getNextSibling();
        
        if (!next.node)
            return false;
        
        if (next.isReturnStatement())
            return false;
        
        return true;
    },
    after: (path, {print}) => {
        print.linebreak();
        markAfter(path);
    },
};
