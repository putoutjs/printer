'use strict';

const {maybeTypeAnnotation} = require('../maybe/maybe-type-annotation');

module.exports.RestElement = maybeTypeAnnotation((path, {print}) => {
    print('...');
    print('__argument');
});
