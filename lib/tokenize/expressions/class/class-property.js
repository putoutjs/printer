'use strict';

const {exists} = require('../../is');
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
    } = node;
    
    const value = path.get('value');
    
    maybe.print(accessibility, `${accessibility} `);
    maybe.print(node.static, 'static ');
    maybe.print(declare, 'declare ');
    
    print('__key');
    maybe.print(optional, '?');
    
    debugger;
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
