'use strict';

const {isNewlineBetweenSiblings} = require('../../is');

const {
    markAfter,
    isMarkedAfter,
} = require('../../mark');

const isDeclarationNewline = (path) => isMarkedAfter(path.get('declaration'));

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
    print(' * as ');
    print('__exported');
};

module.exports.ExportNamedDeclaration = {
    print(path, {print, traverse, write, indent}) {
        const {exportKind} = path.node;
        const specifiers = path.get('specifiers');
        
        write('export ');
        
        if (exportKind === 'type' && specifiers.length) {
            print('type');
            print(specifiers[0]);
            print(' from ');
            print('__source');
            print(';');
            
            return;
        }
        
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
            write(';');
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
