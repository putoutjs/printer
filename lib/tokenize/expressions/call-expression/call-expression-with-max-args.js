import {types} from '@putout/babel';

const {isArrayExpression} = types;

export const CallExpressionWithMaxArgs = (path, {write, indent, traverse}) => {
    const {name} = path.node.callee;
    const args = path.get('arguments');
    
    write(name);
    write('(');
    indent.inc();
    
    for (const arg of args) {
        if (isArrayExpression(arg))
            write.space();
        else
            write.breakline();
        
        traverse(arg);
        write(',');
    }
    
    indent.dec();
    write.breakline();
    write(')');
};

