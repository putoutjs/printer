'use strict';

const {markAfter} = require('../../mark');
const {exists} = require('../../is');

const isEmptyConsequent = (path) => path.get('consequent').isEmptyStatement();
const isInsideNestedBody = ({parentPath}) => {
    if (parentPath.type !== 'BlockStatement')
        return false;
    
    return parentPath.parentPath.type === 'BlockStatement';
};

const isInsideIf = (path) => path.parentPath.parentPath?.isIfStatement();
const isEmptyBody = (path) => !path.node.body.length;

module.exports.IfStatement = {
    print: (path, {indent, print, maybe, write, traverse}) => {
        indent();
        print('if');
        print.space();
        print('(');
        print('__test');
        print(')');
        
        const consequent = path.get('consequent');
        const alternate = path.get('alternate');
        const isConsequentBlock = consequent.isBlockStatement();
        
        if (isConsequentBlock) {
            print.space();
            print(consequent);
            
            if (isInsideIf(path) || isInsideNestedBody(path)) {
                maybe.print.newline(isEmptyBody(consequent));
            }
        } else {
            const is = !isEmptyConsequent(path);
            maybe.print.newline(is);
            maybe.indent.inc(is);
            print(consequent);
            maybe.indent.dec(is);
        }
        
        if (alternate.isBlockStatement()) {
            write.space();
            write('else');
            write.space();
            traverse(alternate);
        } else if (alternate.isIfStatement()) {
            write(' else ');
            traverse(alternate);
        } else if (exists(alternate)) {
            maybe.indent(!isConsequentBlock);
            maybe.write.space(isConsequentBlock);
            write('else');
            write.splitter();
            indent.inc();
            traverse(alternate);
            indent.dec();
        }
    },
    afterIf: (path) => {
        const next = path.getNextSibling();
        
        if (!exists(next))
            return false;
        
        return !next.isReturnStatement();
    },
    after: (path, {print}) => {
        print.linebreak();
        markAfter(path);
    },
};

