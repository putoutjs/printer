'use strict';

module.exports.printKey = (path, {maybe, traverse}) => {
    const {computed} = path.node;
    const key = path.get('key');
    
    maybe.write(computed, '[');
    traverse(key);
    maybe.write(computed, ']');
};
