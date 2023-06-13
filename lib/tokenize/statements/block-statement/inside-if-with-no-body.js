'use strict';

const {exists} = require('../../is');

module.exports.insideIfWithNoBody = (path) => {
    if (!path.parentPath.isIfStatement())
        return false;
    
    if (!path.parentPath.parentPath.isIfStatement())
        return false;
    
    const next = path.parentPath?.parentPath.getNextSibling();
    
    return !exists(next);
};
