'use strict';

const {isNext} = require('../is');

module.exports.JSXText = (path, {write, indent}) => {
    const {value} = path.node;
    const isSpacesOnly = /^\s+$/.test(value);
    const hasNext = isNext(path);
    
    if (isSpacesOnly && hasNext) {
        indent.inc();
        write.newline();
        write.indent();
        indent.dec();
        
        return;
    }
    
    if (isSpacesOnly) {
        write.newline();
        write.indent();
        
        return;
    }
    
    write(value);
};
