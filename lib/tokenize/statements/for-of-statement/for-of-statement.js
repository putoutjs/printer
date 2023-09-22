'use strict';

const {
    hasPrevNewline,
    markAfter,
    markBefore,
    isMarkedAfter,
} = require('../../mark');

const {
    isFirst,
    isNext,
    isLast,
} = require('../../is');

module.exports.ForOfStatement = {
    beforeIf(path) {
        const {parentPath} = path;
        
        if (!parentPath.isBlockStatement() && parentPath.isStatement())
            return false;
        
        return !isFirst(path) && !hasPrevNewline(path);
    },
    before(path, {print}) {
        print.linebreak();
        markBefore(path);
    },
    print(path, {indent, print, maybe, traverse}) {
        const {node} = path;
        
        indent();
        print('for');
        maybe.print(node.await, ' await');
        print.space();
        print('(');
        print('__left');
        print(' of ');
        print('__right');
        print(')');
        
        const bodyPath = path.get('body');
        
        if (bodyPath.isBlockStatement()) {
            print.space();
            print('__body');
            
            const {length} = bodyPath.node.body;
            maybe.print.newline(!length && !isLast(path) && !isNext(path));
            
            return;
        }
        
        indent.inc();
        print.newline();
        traverse(bodyPath);
        indent.dec();
        
        maybe.markAfter(isMarkedAfter(bodyPath), path);
    },
    afterIf: isNext,
    after(path, {print}) {
        print.linebreak();
        markAfter(path);
    },
};
