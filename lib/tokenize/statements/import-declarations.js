'use strict';

const {markAfter} = require('../mark');
const {isLast} = require('../is');

module.exports.ImportDeclaration = {
    print(path, {print, maybe}) {
        const specifiers = path.get('specifiers');
        print('import ');
        
        let wasSpecifier = false;
        const n = specifiers.length - 1;
        
        for (const [index, spec] of specifiers.entries()) {
            if (spec.isImportDefaultSpecifier()) {
                print(spec.get('local'));
                continue;
            }
            
            if (spec.isImportSpecifier()) {
                maybe.print(index, ', ');
                maybe.print(!wasSpecifier, '{');
                
                wasSpecifier = true;
                
                print(spec.get('imported'));
                maybe.print(index === n, '}');
                
                continue;
            }
        }
        
        if (specifiers.length) {
            print.space();
            print('from');
            print.space();
        }
        
        print('__source');
        print(';');
        
        if (!isLast(path))
            print.newline();
    },
    afterIf(path) {
        if (isLast(path))
            return false;
        
        if (path.getNextSibling().isImportDeclaration())
            return false;
        
        return true;
    },
    after(path, {print}) {
        print.newline();
        markAfter(path);
    },
};
