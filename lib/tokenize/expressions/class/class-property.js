'use strict';

const {exists, isPrev} = require('../../is');
const {maybePrintTypeAnnotation} = require('../../literals/maybe-type-annotation');

module.exports.ClassProperty = ClassProperty;
module.exports.ClassPrivateProperty = ClassProperty;

module.exports.PrivateName = (path, {print}) => {
    print('#');
    print('__id');
};

function ClassProperty(path, printer) {
    const {print, maybe} = printer;
    const {node} = path;
    const {
        accessibility,
        declare,
        optional,
        decorators,
    } = node;
    
    if (decorators) {
        for (const decorator of path.get('decorators')) {
            maybe.print.breakline(isPrev(path));
            print(decorator);
            print.breakline();
        }
    }
    
    if (path.__putout_printer_accessor) {
        print('accessor ');
    }
    
    const value = path.get('value');
    
    maybe.print(accessibility, `${accessibility} `);
    maybe.print(node.static, 'static ');
    maybe.print(declare, 'declare ');
    
    print('__key');
    maybe.print(optional, '?');
    
    maybePrintTypeAnnotation(path, printer);
    
    if (exists(value)) {
        print.space();
        print('=');
        print.space();
        print('__value');
    }
    
    print(';');
    print.newline();
}

module.exports.ClassAccessorProperty = (path, printer) => {
    path.__putout_printer_accessor = true;
    ClassProperty(path, printer);
    delete path.__putout_printer_accessor;
};
