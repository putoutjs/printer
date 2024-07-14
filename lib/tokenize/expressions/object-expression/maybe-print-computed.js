'use strict';

module.exports.maybePrintComputed = (path, key, {maybe, traverse}) => {
    const {computed} = path.node;
    
    maybe.write(computed, '[');
    traverse(key);
    maybe.write(computed, ']');
};
