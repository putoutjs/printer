'use strict';

const {maybeTypeAnnotation} = require('../maybe/maybe-type-annotation');

module.exports.TSPropertySignature = maybeTypeAnnotation((path, {print, maybe}) => {
    const {optional} = path.node;
    
    print('__key');
    maybe.print(optional, '?');
});
