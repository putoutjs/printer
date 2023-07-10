'use strict';

const {exists} = require('../is');

module.exports.TSPropertySignature = (path, {print, maybe, traverse}) => {
    const {optional} = path.node;
    const typeAnnotation = path.get('typeAnnotation');
    
    print('__key');
    maybe.print(optional, '?');
    
    if (exists(typeAnnotation)) {
        print(':');
        print.space();
        traverse(typeAnnotation);
    }
};
