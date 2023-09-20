'use strict';

const {maybeTypeAnnotation} = require('../literals/maybe-type-annotation');

module.exports.TSPropertySignature = maybeTypeAnnotation((path, {print, maybe, traverse}) => {
    const {optional} = path.node;
    
    print('__key');
    maybe.print(optional, '?');
});
