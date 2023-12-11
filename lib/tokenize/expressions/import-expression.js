'use strict';

module.exports.ImportExpression = (path, {print, maybe}) => {
    print('import(');
    print('__source');
    maybe.print(path.node.options, ', ');
    print('__options');
    print(')');
};
