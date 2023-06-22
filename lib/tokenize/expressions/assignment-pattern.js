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
    const {parentPath} = path;
    
    if (parentPath.isObjectProperty() && !parentPath.node.shorthand)
        return true;
    
    if (isArg(path))
        return true;
    
    if (parentPath.isTSParameterProperty())
        return true;
    
    return parentPath.isArrayPattern();
}
