'use strict';

const {isNext} = require('../is');

module.exports.JSXText = (path, {write, indent}) => {
    const {value} = path.node;
    const isSpacesOnly = /^\s+$/.test(value);
    const hasNext = isNext(path);
    
    if (isSpacesOnly && hasNext) {
        indent.inc();
        write.breakline();
        indent.dec();
        
        return;
    }
    
    if (isSpacesOnly) {
        write.breakline();
        
        return;
    }
    
    write(value);
};
