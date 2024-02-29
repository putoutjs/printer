'use strict';

module.exports.ImportExpression = (path, {print, maybe}) => {
    const {options} = path.node;
    
    print('import(');
    print('__source');
    
    maybe.print(options, ',');
    maybe.print.space(options);
    
    print('__options');
    print(')');
};
