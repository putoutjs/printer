'use strict';

module.exports.TSParenthesizedType = (path, {print}) => {
    print('(');
    print('__typeAnnotation');
    print(')');
};
