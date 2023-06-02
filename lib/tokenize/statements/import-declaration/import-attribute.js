'use strict';

module.exports.ImportAttribute = (path, {print}) => {
    print('{');
    print.space();
    print('__key');
    print(':');
    print.space();
    print('__value');
    print.space();
    print('}');
};

module.exports.printAttributes = (path, {write, traverse}) => {
    const attributes = path.get('attributes');
    
    if (!attributes.length)
        return;
    
    write(' with');
    write.space();
    
    for (const attr of attributes) {
        traverse(attr);
    }
};
