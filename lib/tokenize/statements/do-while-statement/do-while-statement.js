import {isInsideLabel, isLast} from '#is';

const not = (fn) => (...a) => !fn(...a);
const notLast = (path) => !isLast(path);

export const DoWhileStatement = {
    beforeIf: not(isInsideLabel),
    before: (path, {indent}) => {
        indent();
    },
    print(path, {print}) {
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
    afterSatisfy: () => [
        notLast,
    ],
    after(path, {print}) {
        print.newline();
    },
};
