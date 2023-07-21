'use strict';

const {printParams} = require('../../expressions/functions/params');

module.exports.TSDeclareMethod = (path, printer, semantics) => {
    const {print, maybe} = printer;
    const {accessibility, abstract} = path.node;
    
    if (accessibility) {
        print(accessibility);
        print(' ');
    }
    
    if (abstract) {
        print('abstract');
        print(' ');
    }
    
    print('__key');
    
    printParams(path, printer, semantics);
    
    print(':');
    print.space();
    print('__returnType');
    print(';');
    print.newline();
};
