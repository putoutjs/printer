'use strict';

module.exports.ClassProperty = (path, {print}) => {
    print('__key');
    print.space();
    print('=');
    print.space();
    print('__value');
    print(';');
    print.newline();
};
