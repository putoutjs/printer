import {
    isInsideLabel,
    exists,
    getNext,
} from '#is';
import {markAfter} from '#mark';

export const ForStatement = {
    print(path, {print, maybe}) {
        const {
            test,
            update,
            body,
        } = path.node;
        
        maybe.indent(!isInsideLabel(path));
        print('for');
        print.space();
        print('(');
        print('__init');
        print(';');
        maybe.print.space(test);
        print('__test');
        
        print(';');
        maybe.print.space(update);
        print('__update');
        print(')');
        
        if (body.body) {
            print.space();
            print('__body');
            
            return;
        }
        
        const is = !path.get('body').isEmptyStatement();
        maybe.print.newline(is);
        maybe.indent.inc(is);
        print('__body');
        maybe.indent.dec(is);
    },
    afterIf: getNext(exists),
    after(path, {print}) {
        print.linebreak();
        markAfter(path);
    },
};
