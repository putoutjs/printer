import {
    isNext,
    isInsideIf,
    isInsideBlock,
} from '#is';

export const DebuggerStatement = {
    print(path, {print, indent}) {
        indent();
        print('debugger;');
    },
    afterSatisfy: () => [
        isNext,
        isInsideBlock,
        isInsideIf,
    ],
    after(path, {print}) {
        print.newline();
    },
};
