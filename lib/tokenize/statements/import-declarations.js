'use strict';

const {markAfter} = require('../mark');
const {entries} = Object;

module.exports.ImportDeclaration = (path, {print, maybe}) => {
    const specifiers = path.get('specifiers');
    print('import ');
    
    for (const [index, spec] of specifiers.entries()) {
        if (spec.isImportDefaultSpecifier()) {
            print(spec.get('local'));
            continue;
        }
        
        if (spec.isImportSpecifier()) {
            maybe.print(index, ', ');
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
    
    if (shouldAddNewlineAfter(path)) {
        print.newline();
        markAfter(path);
    }
};

function shouldAddNewlineAfter(path) {
    if (path.getNextSibling().isImportDeclaration())
        return false;
    
    return true;
}
