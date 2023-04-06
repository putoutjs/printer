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
} = require('../is');

module.exports.ForOfStatement = {
    beforeIf(path) {
        return !isFirst(path) && !hasPrevNewline(path);
    },
    before(path, {print}) {
        print.indent();
        print.newline();
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
        
        if (bodyPath.isExpressionStatement()) {
            indent.inc();
            print.newline();
            traverse(bodyPath);
            
            maybe.markAfter(isMarkedAfter(bodyPath), path);
            
            indent.dec();
            maybe.print.newline(isNext(path));
            
            return;
        }
        
        if (bodyPath.isBlockStatement()) {
            print(' ');
            print('__body');
        }
    },
    afterIf: isNext,
    after(path, {print}) {
        print.indent();
        print.newline();
        markAfter(path);
    },
};
