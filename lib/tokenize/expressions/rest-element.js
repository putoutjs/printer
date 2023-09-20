'use strict';

const {maybeTypeAnnotation} = require('../literals/maybe-type-annotation');

module.exports.RestElement = maybeTypeAnnotation((path, {print, traverse}) => {
    print('...');
    print('__argument');
});
