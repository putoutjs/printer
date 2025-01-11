'use strict';

const {exists} = require('../../is');
const {maybeParens} = require('../../maybe/maybe-parens');
const {isArray} = Array;

const parseArgs = (path) => {
    const argsPath = path.get('arguments');
    
    if (!isArray(argsPath))
        return [];
    
    return argsPath;
};

const CallExpression = maybeParens((path, {indent, print, maybe, traverse}) => {
    const args = parseArgs(path);
    const isParentCall = tooLong(args) && path.parentPath.isCallExpression();
    
    const callee = path.get('callee');
    const typeParameters = path.get('typeArguments');
    
    traverse(callee);
    
    if (exists(typeParameters))
        traverse(typeParameters);
    
    if (path.node.optional)
        print('?.');
    
    print('(');
    
    const n = args.length - 1;
    
    maybe.indent.inc(isParentCall);
    
    for (const [i, arg] of args.entries()) {
        const isObject = arg.isObjectExpression();
        
        if (isParentCall && !isObject && n)
            print.breakline();
        
        print(arg);
        
        if (isParentCall && n) {
            print(',');
            continue;
        }
        
        if (i < n) {
            print(',');
            print.space();
        }
    }
    
    if (isParentCall) {
        indent.dec();
        maybe.print.breakline(n);
    }
    
    print(')');
});

module.exports.OptionalCallExpression = CallExpression;
module.exports.CallExpression = CallExpression;

function tooLong(args) {
    for (const arg of args) {
        if (arg.isIdentifier() && arg.node.name.length > 10)
            return true;
    }
    
    return false;
}
