'use strict';

const {exists} = require('../../is');
const {maybePrintTypeAnnotation} = require('../../literals/maybe-type-annotation');
const {maybePrintDecorators} = require('./maybe-print-decorators');

module.exports.ClassProperty = processClassProperty;
module.exports.ClassPrivateProperty = processClassProperty;

module.exports.PrivateName = (path, {print}) => {
    print('#');
    print('__id');
};

module.exports.ClassAccessorProperty = (path, printer, semantics) => {
    processClassProperty(path, printer, semantics, {
        accessor: true,
    });
};

function processClassProperty(path, printer, semantics, {accessor} = {}) {
    const {print, maybe} = printer;
    const {node} = path;
    const {
        accessibility,
        declare,
        optional,
    } = node;
    
    maybePrintDecorators(path, printer);
    maybe.print(accessor, 'accessor ');
    
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
