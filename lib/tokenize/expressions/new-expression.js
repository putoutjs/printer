'use strict';

module.exports.NewExpression = (path, {print, maybe}) => {
    print('new ');
    print('__callee');
    print('__typeParameters');
    
    const args = path.get('arguments');
    print('(');
    
    const n = args.length - 1;
    
    for (const [i, arg] of args.entries()) {
        print(arg);
        maybe.print(i < n, ', ');
    }
    
    print(')');
};
