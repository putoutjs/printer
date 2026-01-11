import {
    isParentBlock,
    isNextParent,
    isInsideIf,
    isInsideLabel,
} from '#is';

const isInsideCase = (path) => path.parentPath.isSwitchCase();

export const BreakStatement = {
    split(path, {print}) {
        print.newline();
    },
    print(path, {print, maybe}) {
        const {label} = path.node;
        
        maybe.indent(!isInsideLabel(path));
        print('break');
        maybe.print.space(label);
        print('__label');
        print(';');
    },
    afterSatisfy: () => [
        isParentBlock,
        isNextParent,
        isInsideCase,
        isInsideIf,
    ],
};
