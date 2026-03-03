import {
    isNext,
    isInsideIf,
    isParentBlock,
} from '#is';

export const DebuggerStatement = {
    print(path, {print, indent}) {
        indent();
        print('debugger;');
    },
    afterSatisfy: () => [
        isNext,
        isParentBlock,
        isInsideIf,
    ],
    after(path, {print}) {
        print.newline();
    },
};
