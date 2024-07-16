'use strict';

const {isNext} = require('../is');

module.exports.JSXText = (path, {write, indent}) => {
    const {node} = path;
    const {value, extra} = node;
    const isSpacesOnly = /^\s+$/.test(value);
    const hasNext = isNext(path);
    
    if (extra.raw.includes('&'))
        return write(extra.raw);
    
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
