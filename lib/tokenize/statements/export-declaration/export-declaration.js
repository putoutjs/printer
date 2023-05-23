'use strict';

const {
    isNewlineBetweenSiblings,
    exists,
    isNext,
} = require('../../is');

const {
    markAfter,
    isMarkedAfter,
} = require('../../mark');

const {isExportNamespaceSpecifier} = require('@babel/types');

const isDeclarationNewline = (path) => isMarkedAfter(path.get('declaration'));

const options = {
    exports: {
        maxOneLineSpecifiers: 2,
    },
};

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

module.exports.ExportNamespaceSpecifier = (path, {print}) => {
    print('* as ');
    print('__exported');
};

module.exports.ExportNamedDeclaration = {
    print(path, {print, traverse, write, indent, maybe}) {
        const {exportKind} = path.node;
        const specifiers = path.get('specifiers');
        const {maxOneLineSpecifiers} = options.exports;
        const source = path.get('source');
        
        indent();
        write('export');
        write.space();
        
        if (exportKind === 'type' && specifiers.length) {
            print('type ');
            print(specifiers[0]);
            print(' from ');
            traverse(source);
            print(';');
            
            return;
        }
        
        if (isExportNamespaceSpecifier(specifiers[0])) {
            print(specifiers[0]);
            print(' from ');
            print('__source');
            print(';');
            print.newline();
            
            return;
        }
        
        const n = specifiers.length;
        const isNewline = !exists(source) || n > maxOneLineSpecifiers;
        
        if (specifiers.length) {
            write('{');
            indent.inc();
            maybe.write.newline(isNewline);
            
            for (const spec of specifiers) {
                maybe.indent(isNewline);
                traverse(spec);
                maybe.write(isNewline, ',');
                maybe.write.newline(isNewline);
            }
            
            indent.dec();
            write('}');
            
            const source = path.get('source');
            
            if (exists(source)) {
                write(' from ');
                traverse(source);
            }
            
            write(';');
            maybe.write.newline(isNext(path));
            
            return;
        }
        
        print('__declaration');
    },
    afterIf(path) {
        if (isDeclarationNewline(path))
            return false;
        
        return isNewlineBetweenSiblings(path);
    },
    after(path, {print}) {
        print.newline();
        markAfter(path);
    },
};
