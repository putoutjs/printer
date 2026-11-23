import {
    isInsideLabel,
    isLastEmptyInBlock,
} from '#is';

export const ForInStatement = (path, {print, maybe}) => {
    maybe.indent(!isInsideLabel(path));
    print('for');
    print.space();
    print('(');
    print('__left');
    print(' in ');
    print('__right');
    print(')');
    
    if (path.get('body').isBlockStatement())
        print.space();
    
    print('__body');
    maybe.print.newline(isLastEmptyInBlock(path));
};
