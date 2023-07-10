'use strict';

module.exports.TSIntersectionType = (path, {traverse, write}) => {
    const types = path.get('types');
    const n = types.length - 1;
    
    for (const [i, type] of types.entries()) {
        const isLast = i === n;
        
        traverse(type);
        
        if (!isLast) {
            write.space();
            write('&');
            write.space();
        }
    }
};
