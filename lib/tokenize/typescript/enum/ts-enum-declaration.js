'use strict';

const {
    isNext,
    isNextParent,
    isLast,
} = require('../../is');

const {markAfter} = require('../../mark');

module.exports.TSEnumDeclaration = {
    beforeIf(path) {
        return path.node.const;
    },
    before(path, {print}) {
        print('const ');
    },
    print(path, {print, traverse, indent}) {
        print('enum ');
        print('__id');
        print(' ');
        print('{');
        
        indent.inc();
        print.newline();
        
        for (const member of path.get('body.members')) {
            traverse(member);
            print(',');
            print.newline();
        }
        
        indent.dec();
        indent();
        print('}');
        
        if (isLast(path))
            return;
        
        print.newline();
        markAfter(path);
    },
    afterSatisfy: () => [isNext, isNextParent],
    after(path, {print}) {
        print.linebreak();
    },
};
