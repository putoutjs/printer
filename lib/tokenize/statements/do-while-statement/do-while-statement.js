import {isLast} from '#is';

const notLast = (path) => !isLast(path);

export const DoWhileStatement = {
    print(path, {print, indent}) {
        indent();
        print('do');
        print.space();
        print('__body');
        print.space();
        print('while');
        print.space();
        print('(');
        print('__test');
        print(')');
        print(';');
    },
    afterSatisfy: () => [notLast],
    after(path, {print}) {
        print.newline();
    },
};
