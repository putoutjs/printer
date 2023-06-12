'use strict';

module.exports.maybeSpaceAfterKeyword = (path, {write}) => {
    const {declarations} = path.node;
    const {id} = declarations[0];
    
    if (id.type === 'ArrayPattern' || id.type === 'ObjectPattern')
        return write.space();
    
    write(' ');
};
