'use strict';

module.exports.writeTemplateLiteral = (quasis, expressions, {write, traverse}) => {
    write('`');
    let i = 0;
    
    for (const element of quasis) {
        write(element.node.value.raw);
        
        const exp = expressions[i++];
        
        if (exp) {
            write('${');
            traverse(exp);
            write('}');
        }
    }
    
    write('`');
};
