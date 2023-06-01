'use strict';

const isArg = (path) => path.parentPath.isFunction();

module.exports.AssignmentPattern = {
    print(path, {print, maybe}) {
        maybe.print(shouldPrint(path), '__left');
        print.space();
        print('=');
        print.space();
        print('__right');
    },
};

function shouldPrint(path) {
    if (path.parentPath.isObjectProperty() && !path.parentPath.node.shorthand)
        return true;
    
    if (isArg(path))
        return true;
    
    return path.parentPath.isArrayPattern();
}
