'use strict';

module.exports.ImportAttribute = (path, {print}) => {
    print('__key');
    print(':');
    print.space();
    print('__value');
    print(',');
};

module.exports.printAttributes = (path, keyword, {write, traverse, indent}) => {
    const attributes = path.get('attributes');
    
    if (!attributes.length)
        return;
    
    write(` ${keyword}`);
    write.space();
    
    write('{');
    write.breakline();
    indent.inc();
    
    for (const attr of attributes) {
        indent();
        traverse(attr);
        write.newline();
    }
    
    indent.dec();
    write('}');
};
