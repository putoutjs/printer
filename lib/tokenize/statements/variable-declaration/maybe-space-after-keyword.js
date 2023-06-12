'use strict';

module.exports.maybeSpaceAfterKeyword = (path, {write}) => {
    const {declarations} = path.node;
    const {id} = declarations[0];
    
    if (declarations.length > 1)
        return;
    
    if (id.type === 'ArrayPattern' || id.type === 'ObjectPattern')
        return write.space();
    
    write(' ');
};
