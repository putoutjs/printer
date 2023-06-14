'use strict';

const {markAfter} = require('../../mark');
const {
    isLast,
    isNext,
} = require('../../is');
const {parseImportSpecifiers} = require('parse-import-specifiers');

const {
    maybePrintAttributes,
    ImportAttribute,
} = require('./import-attribute');

module.exports.ImportAttribute = ImportAttribute;
module.exports.ImportDeclaration = {
    print(path, {print, maybe, write, traverse, indent}, options) {
        const isType = path.node.importKind === 'type';
        const specifiers = path.get('specifiers');
        const {maxSpecifiersInOneLine} = options;
        
        indent();
        write('import');
        maybe.write(isType, ' type');
        
        let wasSpecifier = false;
        const n = specifiers.length - 1;
        
        const {
            defaults,
            namespaces,
            imports,
        } = parseImportSpecifiers(specifiers);
        
        maybe.write(specifiers.length, ' ');
        
        for (const spec of defaults) {
            traverse(spec.get('local'));
            maybe.write(n, ',');
            maybe.write.space(n);
        }
        
        for (const spec of namespaces) {
            write('* as ');
            traverse(spec.get('local'));
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
            maybe.write.breakline(importsCount > maxSpecifiersInOneLine);
            
            wasSpecifier = true;
            write(imported.name);
            
            if (imported.name !== local.name) {
                write(' as ');
                write(spec.node.local.name);
            }
            
            if (importsCount <= maxSpecifiersInOneLine && notLast) {
                maybe.write(n, ',');
                maybe.write.space(n);
            }
            
            if (importsCount > maxSpecifiersInOneLine) {
                maybe.write(n, ',');
                maybe.write.newline(index === n);
            }
            
            indent.dec();
            maybe.write(last, '}');
        }
        
        maybe.write(specifiers.length, ' from');
        print.space();
        
        print('__source');
        maybePrintAttributes(path, {
            write,
            traverse,
        });
        print(';');
        
        if (isNext(path))
            print.newline();
    },
    afterIf(path) {
        if (isLast(path))
            return false;
        
        return !path.getNextSibling().isImportDeclaration();
    },
    after(path, {print}) {
        print.newline();
        markAfter(path);
    },
};
