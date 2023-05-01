'use strict';

const isArg = (path) => path.parentPath.isFunction();

module.exports.AssignmentPattern = {
    print(path, {print, maybe}) {
        maybe.print(shouldPrint(path), '__left');
        print(' = ');
        print('__right');
    },
};

function shouldPrint(path) {
    if (path.parentPath.isObjectProperty())
        return true;
    
    if (isArg(path))
        return true;
    
    return path.parentPath.isArrayPattern();
}

