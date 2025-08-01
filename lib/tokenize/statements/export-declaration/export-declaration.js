'use strict';

const {types} = require('@putout/babel');

const {isParentBlock} = require('#is');
const {
    markAfter,
    isMarkedAfter,
    hasPrevNewline,
} = require('../../mark');

const {
    isNewlineBetweenSiblings,
    exists,
    isNext,
    isLast,
} = require('../../is');

const {
    isExportNamespaceSpecifier,
    isVariableDeclaration,
    isExportNamedDeclaration,
} = types;

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
    beforeIf(path) {
        const prev = path.getPrevSibling();
        
        if (hasPrevNewline(path))
            return false;
        
        return isVariableDeclaration(prev);
    },
    before(path, {print}) {
        print.linebreak();
    },
    print(path, {print, traverse, indent, maybe}, semantics) {
        const {trailingComma} = semantics;
        const {exportKind} = path.node;
        const specifiers = path.get('specifiers');
        const {maxOneLineSpecifiers} = options.exports;
        const source = path.get('source');
        
        indent();
        print('export');
        
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
        
        if (specifiers && !path.node.declaration) {
            print.space();
            print('{');
            
            if (specifiers.length) {
                indent.inc();
                maybe.print.newline(isNewline);
                
                const lastIndex = n - 1;
                
                for (const [i, spec] of specifiers.entries()) {
                    const isType = spec.node.exportKind === 'type';
                    const isLast = i < lastIndex;
                    
                    maybe.indent(isNewline);
                    maybe.print(isType, 'type ');
                    traverse(spec);
                    
                    if (isLast && !isNewline)
                        print(', ');
                    else if (isNewline)
                        maybe.print(isLast || trailingComma, ',');
                    
                    maybe.print.newline(isNewline);
                }
                
                indent.dec();
                indent();
            }
            
            print('}');
            const source = path.get('source');
            
            if (exists(source)) {
                print(' from ');
                traverse(source);
            }
            
            print(';');
            maybe.print.newline(isNext(path) || isInsideNamespace(path));
            
            return;
        }
        
        print(' ');
        print('__declaration');
    },
    afterIf(path) {
        if (isLast(path))
            return false;
        
        if (isDeclarationNewline(path))
            return false;
        
        if (isNewlineBetweenSiblings(path))
            return true;
        
        return isParentBlock(path);
    },
    after(path, {print, indent}) {
        const next = path.getNextSibling();
        
        if (isExportNamedDeclaration(next))
            indent();
        
        print.newline();
        
        markAfter(path);
    },
};
