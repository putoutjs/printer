'use strict';

const {markAfter} = require('../../mark');
const {isLast} = require('../../is');
const {parseSpecifiers} = require('./parse-specifiers');

module.exports.ImportDeclaration = {
    print(path, {print, maybe, write, traverse, indent}) {
        const isType = path.node.importKind === 'type';
        const specifiers = path.get('specifiers');
        
        print('import ');
        maybe.print(isType, 'type ');
        
        let wasSpecifier = false;
        const n = specifiers.length - 1;
        
        const {
            defaults,
            namespaces,
            imports,
        } = parseSpecifiers(specifiers);
        
        for (const spec of defaults) {
            traverse(spec.get('local'));
            maybe.write(n, ',');
            maybe.write.space(n);
        }
        
        for (const spec of namespaces) {
            print('* as ');
            print(spec.get('local'));
        }
        
        const importsCount = imports.length - 1;
        
        for (const [index, spec] of imports.entries()) {
            const last = index === importsCount;
            const notLast = !last;
            
            const {
                imported,
                local,
            } = spec.node;
            
            indent.inc();
            
            maybe.write(!wasSpecifier, '{');
            maybe.write.breakline(importsCount > 2);
            
            wasSpecifier = true;
            write(imported.name);
            
            if (imported.name !== local.name) {
                write(' as ');
                write(spec.node.local.name);
            }
            
            if (importsCount <= 2 && notLast) {
                maybe.write(n, ',');
                maybe.write.space(n);
            }
            
            if (importsCount > 2) {
                maybe.write(n, ',');
                maybe.write.newline(index === n);
            }
            
            indent.dec();
            maybe.write(last, '}');
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
