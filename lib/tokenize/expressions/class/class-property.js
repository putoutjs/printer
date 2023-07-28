'use strict';

const {exists} = require('../../is');

module.exports.ClassProperty = ClassProperty;
module.exports.ClassPrivateProperty = ClassProperty;
module.exports.PrivateName = (path, {print}) => {
    print('#');
    print('__id');
};

function ClassProperty(path, {print, maybe}) {
    const {node} = path;
    const {
        accessibility,
        declare,
        optional,
    } = node;
    
    const value = path.get('value');
    const typeAnnotation = path.get('typeAnnotation');
    
    maybe.print(accessibility, `${accessibility} `);
    maybe.print(node.static, 'static ');
    maybe.print(declare, 'declare ');
    
    print('__key');
    maybe.print(optional, '?');
    
    if (exists(typeAnnotation)) {
        print(':');
        print.space();
        print(typeAnnotation);
    }
    
    if (exists(value)) {
        print.space();
        print('=');
        print.space();
        print('__value');
    }
    
    print(';');
    print.newline();
}
