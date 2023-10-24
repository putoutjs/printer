'use strict';

const {maybeTypeAnnotation} = require('../maybe/maybe-type-annotation');

module.exports.TSPropertySignature = maybeTypeAnnotation((path, {print, maybe}) => {
    const {optional, readonly} = path.node;
    
    maybe.print(readonly, 'readonly ');
    print('__key');
    maybe.print(optional, '?');
});
