'use strict';

const {
    hasPrevNewline,
    markAfter,
    markBefore,
    isMarkedAfter,
} = require('../mark');

const {
    isFirst,
    isNext,
    isLast,
} = require('../is');

module.exports.ForOfStatement = {
    beforeIf(path) {
        return !isFirst(path) && !hasPrevNewline(path);
    },
    before(path, {print}) {
        print.linebreak();
        markBefore(path);
    },
    print(path, {indent, print, maybe, traverse}) {
        indent();
        print('for (');
        print('__left');
        print(' of ');
        print('__right');
        print(')');
        
        const bodyPath = path.get('body');
        
        if (bodyPath.isBlockStatement()) {
            print(' ');
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
    afterIf: (path) => {
        if (isNext(path))
            return true;
        
        return false;
    },
    after(path, {print}) {
        print.linebreak();
        markAfter(path);
    },
};
