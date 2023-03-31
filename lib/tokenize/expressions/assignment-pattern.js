'use strict';

const isArg = (path) => path.parentPath.isFunction();

module.exports.AssignmentPattern = (path, {print, maybe}) => {
    maybe.print(shouldPrint(path), '__left');
    print(' = ');
    print('__right');
};

function shouldPrint(path) {
    if (isArg(path))
        return true;
    
    if (path.parentPath.isArrayPattern())
        return true;
    
    return false;
}
