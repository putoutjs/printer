'use strict';

const {entries} = Object;

module.exports.NewExpression = (path, {write, maybeWrite, traverse, indent}) => {
    indent();
    write('new ');
    traverse(path.get('callee'));
    
    const args = path.get('arguments');
    write('(');
    
    const n = args.length - 1;
    
    for (const [i, arg] of entries(args)) {
        traverse(arg);
        maybeWrite(i < n, ', ');
    }
    
    write(')');
};

