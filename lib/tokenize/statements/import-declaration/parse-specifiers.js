'use strict';

module.exports.parseSpecifiers = (specifiers) => {
    const defaults = [];
    const namespaces = [];
    const imports = [];
    
    for (const spec of specifiers) {
        if (spec.isImportDefaultSpecifier()) {
            defaults.push(spec);
            continue;
        }
        
        if (spec.isImportNamespaceSpecifier()) {
            namespaces.push(spec);
            continue;
        }
        
        if (spec.isImportSpecifier()) {
            imports.push(spec);
            continue;
        }
    }
    
    return {
        defaults,
        namespaces,
        imports,
    };
};
