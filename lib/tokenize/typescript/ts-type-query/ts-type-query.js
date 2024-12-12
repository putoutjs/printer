'use strict';

const {maybeParens} = require('../../maybe/maybe-parens');

module.exports.TSTypeQuery = maybeParens((path, {print}) => {
    print('typeof ');
    print('__exprName');
});
