'use strict';

const {markAfter} = require('../mark');
const {isLast} = require('../is');

module.exports.ImportDeclaration = {
    print(path, {print, maybe}) {
        const isType = path.node.importKind === 'type';
        const specifiers = path.get('specifiers');
        
        print('import ');
        maybe.print(isType, 'type ');
        
        let wasSpecifier = false;
        const n = specifiers.length - 1;
        
        for (const [index, spec] of specifiers.entries()) {
            if (spec.isImportDefaultSpecifier()) {
                print(spec.get('local'));
                continue;
            }
            
            if (spec.isImportNamespaceSpecifier()) {
                print('* as ');
                print(spec.get('local'));
            }
            
            if (spec.isImportSpecifier()) {
                const {
                    imported,
                    local,
                } = spec.node;
                
                maybe.print(index, ', ');
                maybe.print(!wasSpecifier, '{');
                
                wasSpecifier = true;
                print(imported.name);
                
                if (imported.name !== local.name) {
                    print(' as ');
                    print(spec.node.local.name);
                }
                
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
        
        if (path
            .getNextSibling()
            .isImportDeclaration())
            return false;
        
        return true;
    },
    after(path, {print}) {
        print.newline();
        markAfter(path);
    },
};
