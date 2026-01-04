import {isNext} from '#is';
import {markAfter} from '../../mark.js';

export const WhileStatement = {
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
        } else {
            indent.inc();
            print.newline();
            print('__body');
            indent.dec();
        }
    },
    afterIf(path) {
        return isNext(path);
    },
    after(path, {print}) {
        print.linebreak();
        markAfter(path);
    },
};
