'use strict';

module.exports.ImportAttribute = (path, {print}) => {
    print('__key');
    print(':');
    print.space();
    print('__value');
};

module.exports.maybePrintAttributes = (path, {write, traverse}) => {
    if (isAssertions(path))
        return printAttributes(path, {
            write,
            traverse,
            type: 'assertions',
            keyword: 'assert',
        });
    
    printAttributes(path, {
        write,
        traverse,
        type: 'attributes',
        keyword: 'with',
    });
};

const isAssertions = (path) => path.node.assertions.length;

function printAttributes(path, {write, traverse, type, keyword}) {
    const attributes = path.get(type);
    
    if (!attributes.length)
        return;
    
    write(` ${keyword}`);
    write.space();
    
    write('{');
    write.space();
    
    for (const attr of attributes) {
        traverse(attr);
    }
    
    write.space();
    write('}');
}
