import {isLast} from '#is';

export const EmptyStatement = (path, {write, maybe}) => {
    const {parentPath} = path;
    write(';');
    maybe.write.newline(!isLast(path) && !isLast(parentPath));
};
