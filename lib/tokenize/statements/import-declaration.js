'use strict';

const {markAfter} = require('../mark');
const {isLast} = require('../is');

module.exports.ImportDeclaration = {
    print(path, {print, maybe, write, traverse, indent}) {
        const isType = path.node.importKind === 'type';
        const specifiers = path.get('specifiers');
        
        print('import ');
        maybe.print(isType, 'type ');
        
        let wasSpecifier = false;
        const n = specifiers.length - 1;
        
        for (const [index, spec] of specifiers.entries()) {
            if (spec.isImportDefaultSpecifier()) {
                traverse(spec.get('local'));
                maybe.write(n, ',');
                maybe.write.space(n);
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
                
                indent.inc();
                
                maybe.write(!wasSpecifier, '{');
                maybe.write.breakline(n);
                
                wasSpecifier = true;
                write(imported.name);
                
                if (imported.name !== local.name) {
                    write(' as ');
                    write(spec.node.local.name);
                }
                
                maybe.write(n, ',');
                indent.dec();
                maybe.write.newline(n && index === n);
                maybe.write(index === n, '}');
                
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
