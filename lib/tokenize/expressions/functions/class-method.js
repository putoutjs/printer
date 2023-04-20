'use strict';

module.exports.ClassMethod = (path, {print, maybe}) => {
    const {kind} = path.node;
    const isConstructor = kind === 'constructor';
    const isMethod = kind === 'method';
    const isGetter = /get|set/.test(kind);
    
    maybe.print(isConstructor, kind);
    maybe.print(isMethod, '__key');
    
    if (isGetter) {
        print(kind);
        print(' ');
        print('__key');
    }
    
    print('(');
    
    const params = path.get('params');
    const n = params.length;
    
    for (let i = 0; i < n; i++) {
        print(params[i]);
        
        if (i < n - 1)
            print(', ');
    }
    
    print(') ');
    print('__body');
};
