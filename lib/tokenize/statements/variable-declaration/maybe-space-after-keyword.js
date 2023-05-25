'use strict';

module.exports.maybeSpaceAfterKeyword = (path, {write}) => {
    const {id} = path.node.declarations[0];
    
    if (id.type === 'ArrayPattern' || id.type === 'ObjectPattern')
        return write.space();
    
    write(' ');
};
