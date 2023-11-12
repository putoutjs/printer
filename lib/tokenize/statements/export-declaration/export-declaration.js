'use strict';

const {
    isNewlineBetweenSiblings,
    exists,
    isNext,
    isLast,
} = require('../../is');

const {markAfter, isMarkedAfter} = require('../../mark');
const {isExportNamespaceSpecifier} = require('@putout/babel').types;
const isDeclarationNewline = (path) => isMarkedAfter(path.get('declaration'));
const isInsideNamespace = (path) => path.parentPath.isTSModuleBlock();

const options = {
    exports: {
        maxOneLineSpecifiers: 2,
    },
};

module.exports.ExportSpecifier = (path, {print}) => {
    const {local, exported} = path.node;
    
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
        
        if (exportKind === 'type' && specifiers.length)
            print(' type');
        
        if (isExportNamespaceSpecifier(specifiers[0])) {
            print(' ');
            print(specifiers[0]);
            print(' from ');
            print('__source');
            print(';');
            maybe.print.newline(!isLast(path));
            
            return;
        }
        
        const n = specifiers.length;
        const isNewline = !exists(source) || n > maxOneLineSpecifiers;
        
        if (specifiers.length) {
            print.space();
            write('{');
            indent.inc();
            maybe.write.newline(isNewline);
            
            const lastIndex = n - 1;
            
            for (const [i, spec] of specifiers.entries()) {
                const isType = spec.node.exportKind === 'type';
                maybe.indent(isNewline);
                maybe.write(isType, 'type ');
                traverse(spec);
                
                if (i < lastIndex && !isNewline) {
                    write(', ');
                }
                
                maybe.write(isNewline, ',');
                maybe.write.newline(isNewline);
            }
            
            indent.dec();
            indent();
            write('}');
            const source = path.get('source');
            
            if (exists(source)) {
                write(' from ');
                traverse(source);
            }
            
            write(';');
            maybe.write.newline(isNext(path) || isInsideNamespace(path));
            
            return;
        }
        
        print(' ');
        print('__declaration');
    },
    afterIf(path) {
        debugger;
        
        if (isLast(path))
            return false;
        
        if (isDeclarationNewline(path))
            return false;
        
        return isNewlineBetweenSiblings(path);
    },
    after(path, {print}) {
        print.newline();
        markAfter(path);
    },
};
