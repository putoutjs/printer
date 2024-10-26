'use strict';

const {exists} = require('../../is');

module.exports.TSTypeParameter = (path, {write, traverse}) => {
    const constraint = path.get('constraint');
    
    if (path.node.in)
        write('in ');
    else if (path.node.out)
        write('out ');
    else if (path.node.const)
        write('const ');
    
    write(path.node.name.name);
    
    if (!exists(constraint))
        return;
    
    write(' extends ');
    
    traverse(constraint);
    
    const defaultPath = path.get('default');
    
    if (exists(defaultPath)) {
        write.space();
        write('=');
        write.space();
        traverse(defaultPath);
    }
};
