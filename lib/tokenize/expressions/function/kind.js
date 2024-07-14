'use strict';

module.exports.printKind = (path, {write}) => {
    const {kind, generator} = path.node;
    
    const isGetter = kind === 'get' || kind === 'set';
    
    if (isGetter)
        write(`${kind} `);
    else if (generator)
        write('*');
};
