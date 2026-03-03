import {isNext} from '#is';
import {markAfter} from '#mark';
import {
    printTrailingCommentBlock,
    printTrailingCommentLine,
} from './while-statement-comments.js';

export const WhileStatement = {
    printTrailingCommentBlock,
    printTrailingCommentLine,
    print(path, {print, indent}) {
        indent();
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
