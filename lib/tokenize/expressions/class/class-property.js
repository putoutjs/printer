'use strict';

const {exists} = require('../../is');
const {maybePrintTypeAnnotation} = require('../../maybe/maybe-type-annotation');
const {maybeDecorators} = require('../../maybe/maybe-decorators');
const {printKey} = require('../object-expression/print-key');
const {printKind} = require('../function/kind');

const processClassProperty = maybeDecorators((path, printer, semantics, {accessor} = {}) => {
    const {node} = path;
    const {
        accessibility,
        declare,
        optional,
    } = node;
    
    const {print, maybe} = printer;
    
    maybe.print(accessor, 'accessor ');
    
    const value = path.get('value');
    
    maybe.print(declare, 'declare ');
    maybe.print(accessibility, `${accessibility} `);
    maybe.print(node.static, 'static ');
    maybe.print(node.readonly, 'readonly ');
    
    printKind(path, printer);
    printKey(path, printer);
    
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
});

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
