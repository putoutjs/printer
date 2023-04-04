'use strict';

const {
    hasPrevNewline,
    markAfter,
} = require('../mark');

const {isFirst} = require('../is');
const isEmptyConsequent = (path) => path.get('consequent').isEmptyStatement();

module.exports.IfStatement = {
    before: (path, {print}) => {
        print.linebreak();
    },
    beforeIf: shouldAddNewlineBefore,
    print: (path, {indent, print, maybe, write, traverse}) => {
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
        } else if (alternate.node) {
            write('else');
            print.newline();
            indent.inc();
            traverse(alternate);
            indent.dec();
        }
        
        //if (shouldAddNewline(path))
        //print.newline();
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
        print.indent();
        print.newline();
        markAfter(path);
    },
};

function shouldAddNewlineBefore(path) {
    if (path.parentPath.isIfStatement())
        return false;
    
    return !isFirst(path) && !hasPrevNewline(path);
}
