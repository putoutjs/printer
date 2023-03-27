'use strict';

const {entries} = Object;

module.exports.ImportDeclaration = (path, {print, maybe}) => {
    const specifiers = path.get('specifiers');
    print('import ');
    
    for (const [index, spec] of entries(specifiers)) {
        if (spec.isImportDefaultSpecifier()) {
            print(spec.get('local'));
            continue;
        }
        
        if (spec.isImportSpecifier()) {
            maybe.print(Number(index), ', ');
            print('{');
            print(spec.get('imported'));
            print('}');
            continue;
        }
    }
    
    print(' ');
    print('from');
    print(' ');
    print('__source');
    print(';');
    print.newline();
};

