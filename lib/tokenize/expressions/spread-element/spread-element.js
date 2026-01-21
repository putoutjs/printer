import {hasTrailingComment} from '#is';

export const SpreadElement = (path, printer) => {
    const {print} = printer;
    print('...');
    print('__argument');
    
    if (hasTrailingComment(path))
        print(',');
};
