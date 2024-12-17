'use strict';

const {isInsideLabel} = require('../../is');

module.exports.LabeledStatement = (path, {print, maybe}) => {
    maybe.indent(!isInsideLabel(path));
    print('__label');
    print(':');
    print.space();
    print('__body');
};
