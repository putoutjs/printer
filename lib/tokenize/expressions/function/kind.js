export const printKind = (path, {write}) => {
    const {kind, generator} = path.node;
    
    const isGetter = kind === 'get' || kind === 'set';
    
    if (isGetter) {
        write(`${kind} `);
        return;
    }
    
    if (generator)
        write('*');
};
