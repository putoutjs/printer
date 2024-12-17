'use strict';

module.exports.LabeledStatement = (path, {print, indent}) => {
    indent();
    print('__label');
    print(':');
    print.space();
    print('__body');
};
