'use strict';

const {parseImportSpecifiers} = require('parse-import-specifiers');

const {markAfter} = require('../../mark');
const {isLast, isNext} = require('../../is');

const {
    maybePrintAttributes,
    ImportAttribute,
} = require('./import-attribute');

module.exports.ImportAttribute = ImportAttribute;
module.exports.ImportDeclaration = {
    print(path, printer, semantics) {
        const {
            print,
            maybe,
            write,
            traverse,
            indent,
        } = printer;
        
        const {phase} = path.node;
        const isType = path.node.importKind === 'type';
        const specifiers = path.get('specifiers');
        
        indent();
        write('import');
        maybe.write(isType, ' type');
        maybe.write(phase, ` ${phase}`);
        
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
        
        const maxSpecifiersInOneLine = parseMaxSpecifiers(imports, semantics);
        const importsCount = imports.length - 1;
        
        for (const [index, spec] of imports.entries()) {
            const last = index === importsCount;
            const notLast = !last;
            
            const {imported, local} = spec.node;
            
            indent.inc();
            
            maybe.write(!wasSpecifier, '{');
            maybe.write.breakline(importsCount >= maxSpecifiersInOneLine);
            
            wasSpecifier = true;
            traverse(spec.get('imported'));
            
            if (imported.name !== local.name) {
                write(' as ');
                write(local.name);
            }
            
            if (importsCount < maxSpecifiersInOneLine && notLast) {
                maybe.write(n, ',');
                maybe.write.space(n);
            }
            
            if (importsCount >= maxSpecifiersInOneLine) {
                maybe.write(n, ',');
                
                const last = index === n;
                const penulty = index === n - 1;
                
                maybe.write.newline(penulty && defaults.length);
                maybe.write.newline(last);
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

function parseMaxSpecifiers(imports, semantics) {
    const {
        maxSpecifiersInOneLine,
        maxPropertiesLengthInOneLine,
    } = semantics;
    
    for (const {node} of imports) {
        if (node.imported.name !== node.local.name)
            return 1;
        
        if (node.imported.name.length >= maxPropertiesLengthInOneLine)
            return 1;
    }
    
    return maxSpecifiersInOneLine;
}
