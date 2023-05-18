'use strict';

const {exists} = require('../is');
module.exports.ClassProperty = ClassProperty;

module.exports.ClassPrivateProperty = (path, {print}) => {
    ClassProperty(path, {print});
};

module.exports.PrivateName = (path, {print}) => {
    print('#');
    print('__id');
};

function ClassProperty(path, {print}) {
    const value = path.get('value');
    print('__key');
    
    if (exists(value)) {
        print.space();
        print('=');
        print.space();
        print('__value');
    }
    
    print(';');
    print.newline();
}
