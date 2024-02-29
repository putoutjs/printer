'use strict';

module.exports.TSImportType = (path, {print, maybe}) => {
    const {options} = path.node;
    
    print('import(');
    print('__argument');
    
    maybe.print(options, ',');
    maybe.print.space(options);
    
    print('__options');
    print(')');
};
