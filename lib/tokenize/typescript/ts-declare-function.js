'use strict';

module.exports.TSDeclareFunction = (path, {print, maybe}) => {
    const {declare} = path.node;
    
    maybe.print(declare, 'declare ');
    print('function ');
    print('__id');
    print('(');
    
    const params = path.get('params');
    const n = params.length - 1;
    
    for (const [i, param] of params.entries()) {
        print(param);
        maybe.print(i < n, ', ');
    }
    
    print(')');
    print(':');
    print.space();
    
    print('__returnType');
};
