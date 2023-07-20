'use strict';

const {exists} = require('../../is');

module.exports.ClassProperty = ClassProperty;

module.exports.ClassPrivateProperty = (path, {print}) => {
    ClassProperty(path, {
        print,
    });
};

module.exports.PrivateName = (path, {print}) => {
    print('#');
    print('__id');
};

function ClassProperty(path, {print}) {
    const {accessibility} = path.node;
    const value = path.get('value');
    const typeAnnotation = path.get('typeAnnotation');
    
    if (accessibility) {
        print(accessibility);
        print(' ');
    }
    
    print('__key');
    
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
