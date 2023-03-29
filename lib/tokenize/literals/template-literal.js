'use strict';

module.exports.TemplateLiteral = (path, {write, traverse}) => {
    write('`');
    
    let i = 0;
    const expressions = path.get('expressions');
    
    for (const element of path.node.quasis) {
        write(element.value.raw);
        
        const exp = expressions[i++];
        
        if (exp) {
            write('${');
            traverse(exp);
            write('}');
        }
    }
    
    write('`');
};
