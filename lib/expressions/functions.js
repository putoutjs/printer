'use strict';

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
    const n = params.length;
    
    for (let i = 0; i < n; i++) {
        traverse(params[i]);
        
        if (i < n - 1)
            write(', ');
    }
    
    write(') ');
    traverse(path.get('body'));
};
