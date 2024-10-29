'use strict';

const {maybeParens} = require('../../maybe/maybe-parens');

module.exports.TSInferType = maybeParens((path, {print}) => {
    print('infer ');
    print('__typeParameter');
});
