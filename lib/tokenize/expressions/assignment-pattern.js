'use strict';

const isArg = (path) => path.parentPath.isFunction();

module.exports.AssignmentPattern = (path, {print, maybe}) => {
    maybe.print(isArg(path), '__left');
    print(' = ');
    print('__right');
};
