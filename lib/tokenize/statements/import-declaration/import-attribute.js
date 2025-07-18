'use strict';

module.exports.ImportAttribute = (path, {print}) => {
    print('__key');
    print(':');
    print.space();
    print('__value');
    print(',');
};

module.exports.maybePrintAttributes = (path, printer) => {
    if (isAssertions(path))
        return printAttributes(path, 'assert', printer);
    
    printAttributes(path, 'with', printer);
};

const isAssertions = (path) => path.node.extra?.deprecatedAssertSyntax;

function printAttributes(path, keyword, {write, traverse, indent}) {
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
}
