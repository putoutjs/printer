'use strict';

module.exports.printKey = (path, {write, traverse, maybe}) => {
    const key = path.get('key');
    const {
        kind,
        computed,
        generator,
    } = path.node;
    
    const isGetter = kind === 'get' || kind === 'set';
    
    if (isGetter)
        write(`${kind} `);
    else if (generator)
        write('*');
    
    maybe.write(computed, '[');
    traverse(key);
    maybe.write(computed, ']');
};
