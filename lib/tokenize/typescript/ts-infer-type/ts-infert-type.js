'use strict';

const {maybeParens} = require('../../expressions/function/parens');

module.exports.TSInferType = maybeParens((path, {print}) => {
    print('infer ');
    print('__typeParameter');
});
