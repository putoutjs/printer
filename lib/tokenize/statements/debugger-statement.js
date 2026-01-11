import {isNext, isInsideIf} from '#is';

const isInsideBlock = (path) => path.parentPath.isBlockStatement();

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
