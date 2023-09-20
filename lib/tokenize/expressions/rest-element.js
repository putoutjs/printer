'use strict';

const {maybeTypeAnnotation} = require('../literals/maybe-type-annotation');

module.exports.RestElement = maybeTypeAnnotation((path, {print}) => {
    print('...');
    print('__argument');
});
