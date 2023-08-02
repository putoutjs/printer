'use strict';

const isString = (a) => typeof a === 'string';
const {exists} = require('../../is');

const isBabel7 = (path) => isString(path.node.name);

module.exports.TSTypeParameter = (path, {write, traverse}) => {
    const constraint = path.get('constraint');
    
    if (path.node.in)
        write('in ');
    else if (path.node.out)
        write('out ');
    else if (path.node.const)
        write('const ');
    
    if (isBabel7(path))
        write(path.node.name);
    else
        write(path.node.name.name);
    
    if (!exists(constraint))
        return;
    
    if (constraint.isTSTypeOperator()) {
        write(' in ');
    } else {
        write(' extends ');
    }
    
    traverse(constraint);
};
