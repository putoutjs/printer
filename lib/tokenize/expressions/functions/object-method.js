'use strict';

module.exports.ObjectMethod = (path, {print}) => {
    const {kind} = path.node;
    
    if (kind !== 'method')
        print(`${kind} `);
    
    print('__key');
    print('(');
    
    const params = path.get('params');
    const n = params.length - 1;
    
    for (let i = 0; i <= n; i++) {
        print(params[i]);
        
        if (i < n)
            print(', ');
    }
    
    print(') ');
    print('__body');
};
