import {isInsideLabel, isNext} from '#is';
import {markAfter} from '#mark';
import {
    printTrailingCommentBlock,
    printTrailingCommentLine,
} from './while-statement-comments.js';

const not = (fn) => (...a) => !fn(...a);

export const WhileStatement = {
    printTrailingCommentBlock,
    printTrailingCommentLine,
    beforeIf: not(isInsideLabel),
    before: (path, {indent}) => {
        indent();
    },
    print(path, {print, indent, maybe}) {
        print('while');
        print.space();
        print('(');
        print('__test');
        print(')');
        
        if (path.node.body.body) {
            print.space();
            print('__body');
            
            return;
        }
        
        indent.inc();
        print.newline();
        print('__body');
        indent.dec();
    },
    afterIf(path) {
        return isNext(path);
    },
    after(path, {print}) {
        print.linebreak();
        markAfter(path);
    },
};

