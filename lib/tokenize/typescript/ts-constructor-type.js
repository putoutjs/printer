'use strict';

const {printParams} = require('../expressions/functions/params');

module.exports.TSConstructorType = (path, printer, semantics) => {
    const {print} = printer;
    
    print('new');
    print(' ');
    
    printParams(path, printer, semantics, {
        params: path.get('parameters'),
    });
    
    print.space();
    print('=>');
    print.space();
    print('__typeAnnotation');
};
