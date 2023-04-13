'use strict';

module.exports.ExportSpecifier = (path, {print}) => {
    const {
        local,
        exported,
    } = path.node;
    print('__local');
    
    if (exported.name !== local.name) {
        print(' as ');
        print('__exported');
    }
};

module.exports.ExportNamedDeclaration = (path, {print, traverse, write, indent}) => {
    const specifiers = path.get('specifiers');
    write('export ');
    
    if (specifiers.length) {
        write('{');
        indent.inc();
        write.newline();
        
        for (const spec of specifiers) {
            indent();
            traverse(spec);
            write(',');
            write.newline();
        }
        
        indent.dec();
        write('}');
    }
    
    print('__declaration');
};
