import {isNext} from '#is';
import {markAfter} from '../../mark.js';

export const WithStatement = {
    print(path, {print, indent}) {
        indent();
        print('with');
        print.space();
        print('(');
        print('__object');
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
