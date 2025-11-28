'use strict';

module.exports.ImportExpression = createImportExpression;
module.exports.createImportExpression = createImportExpression;

function createImportExpression(path, printer) {
    const {print, maybe} = printer;
    const {options} = path.node;
    
    print('import(');
    print('__source');
    
    maybe.print(options, ',');
    maybe.print.space(options);
    
    print('__options');
    print(')');
}
