export const maybeSpaceAfterKeyword = (path, {write}) => {
    const {declarations} = path.node;
    
    if (!declarations.length)
        return;
    
    const {id} = declarations[0];
    
    if (id.type === 'ArrayPattern' || id.type === 'ObjectPattern')
        return write.space();
    
    write(' ');
};
