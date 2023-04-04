'use strict';

const CallExpression = {
    print(path, {indent, print, maybe}) {
        const isParentCall = toLong(path) && path.parentPath.isCallExpression();
        print('__callee');
        
        if (path.node.optional)
            print('?.');
        
        print('(');
        
        const args = path.get('arguments');
        const n = args.length - 1;
        
        maybe.indent.inc(isParentCall);
        
        for (const [i, arg] of args.entries()) {
            const isObject = arg.isObjectExpression();
            
            if (isParentCall && !isObject) {
                print.newline();
                indent();
            }
            
            print(arg);
            
            if (isParentCall) {
                print(',');
                continue;
            }
            
            maybe.print(i < n, ', ');
        }
        
        if (isParentCall) {
            indent.dec();
            print.newline();
            print.indent();
        }
        
        print(')');
    },
};

module.exports.OptionalCallExpression = CallExpression;
module.exports.CallExpression = CallExpression;

function toLong(path) {
    const args = path.get('arguments');
    
    for (const arg of args) {
        if (arg.isIdentifier() && arg.node.name.length > 10)
            return true;
    }
    
    return false;
}
