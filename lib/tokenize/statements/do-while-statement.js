'use strict';

module.exports.DoWhileStatement = (path, {print}) => {
    print('do');
    print.space();
    print('__body');
    print.space();
    print('while ');
    print('(');
    print('__test');
    print(')');
};
