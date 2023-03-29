'use strict';

module.exports.NewExpression = (path, {indent, print, maybe}) => {
    indent();
    print('new ');
    print('__callee');
    
    const args = path.get('arguments');
    
    print('(');
    
    const n = args.length - 1;
    
    for (const [i, arg] of args.entries()) {
        print(arg);
        maybe.print(i < n, ', ');
    }
    
    print(')');
};
