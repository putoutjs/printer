'use strict';

const {isMarkedPrevAfter} = require('../mark');
const isFirst = (path) => path.node === path.parentPath.node.body[0];

module.exports.ArrowFunctionExpression = (path, {write, traverse}) => {
    write('(');
    
    const params = path.get('params');
    const n = params.length;
    
    for (let i = 0; i < n; i++) {
        traverse(params[i]);
        
        if (i < n - 1)
            write(', ');
    }
    
    write(') => ');
    traverse(path.get('body'));
};

module.exports.ObjectMethod = (path, {write, traverse}) => {
    traverse(path.get('key'));
    write('(');
    
    const params = path.get('params');
    const n = params.length - 1;
    
    for (let i = 0; i <= n; i++) {
        traverse(params[i]);
        
        if (i < n)
            write(', ');
    }
    
    write(') ');
    traverse(path.get('body'));
};

module.exports.FunctionDeclaration = (path, {write, traverse}) => {
    if (!isFirst(path) && !isMarkedPrevAfter(path))
        write('\n');
    
    write('function ');
    traverse(path.get('id'));
    write('(');
    
    const params = path.get('params');
    const n = params.length - 1;
    
    for (let i = 0; i <= n; i++) {
        traverse(params[i]);
        
        if (i < n)
            write(', ');
    }
    
    write(') ');
    traverse(path.get('body'));
};

module.exports.ClassMethod = (path, {write, traverse}) => {
    traverse(path.get('key'));
    write('(');
    
    const params = path.get('params');
    const n = params.length;
    
    for (let i = 0; i < n; i++) {
        traverse(params[i]);
        
        if (i < n - 1)
            write(', ');
    }
    
    write(') ');
    traverse(path.get('body'));
};
