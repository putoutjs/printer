'use strict';

module.exports.printKind = (path, {write, traverse, maybe}) => {
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
};
