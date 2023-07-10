'use strict';

const {printParams} = require('../expressions/functions/params');

module.exports.TSFunctionType = (path, printer, semantics) => {
    const {print} = printer;
    
    printParams(path, printer, semantics, {
        params: path.get('parameters'),
    });
    print.space();
    print('=>');
    print.space();
    print('__typeAnnotation');
};

