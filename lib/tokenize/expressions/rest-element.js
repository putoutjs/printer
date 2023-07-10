'use strict';

const {exists} = require('../is');

module.exports.RestElement = (path, {print, traverse}) => {
    const typeAnnotation = path.get('typeAnnotation');
    
    print('...');
    print('__argument');
    
    if (exists(typeAnnotation)) {
        print(':');
        print.space();
        traverse(typeAnnotation);
    }
};
