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
        
        if (bodyPath.isBlockStatement()) {
            print(' ');
            print('__body');
            
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
        print.indent();
        print.newline();
        markAfter(path);
    },
};
