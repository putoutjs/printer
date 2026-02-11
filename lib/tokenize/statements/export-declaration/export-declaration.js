import {types} from '@putout/babel';
import {
    isParentBlock,
    isNewlineBetweenSiblings,
    exists,
    isNext,
    isLast,
} from '#is';
import {
    markAfter,
    isMarkedAfter,
    hasPrevNewline,
} from '../../mark.js';
import {printAttributes} from '../import-declaration/import-attribute.js';

const {
    isExportNamespaceSpecifier,
    isVariableDeclaration,
    isExportNamedDeclaration,
    isExportDefaultSpecifier,
} = types;

const isDeclarationNewline = (path) => isMarkedAfter(path.get('declaration'));
const isInsideNamespace = (path) => path.parentPath.isTSModuleBlock();

const options = {
    exports: {
        maxOneLineSpecifiers: 2,
    },
};

export const ExportSpecifier = (path, {print}) => {
    const {local, exported} = path.node;
    
    print('__local');
    
    if (exported.name !== local.name) {
        print(' as ');
        print('__exported');
    }
};

export const ExportNamespaceSpecifier = (path, {print}) => {
    print('* as ');
    print('__exported');
};

export const ExportDefaultSpecifier = (path, {print}) => {
    print('__exported');
};

export const ExportNamedDeclaration = {
    beforeIf(path) {
        const prev = path.getPrevSibling();
        
        if (hasPrevNewline(path))
            return false;
        
        return isVariableDeclaration(prev);
    },
    before(path, {print}) {
        print.linebreak();
    },
    print(path, printer, semantics) {
        const {
            print,
            traverse,
            indent,
            maybe,
        } = printer;
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
            printAttributes(path, 'with', printer);
            print(';');
            maybe.print.newline(!isLast(path));
            
            return;
        }
        
        const n = specifiers.length;
        const isNewline = !exists(source) || n > maxOneLineSpecifiers;
        
        if (specifiers && !path.node.declaration) {
            print.space();
            
            const [first, ...rest] = specifiers;
            
            if (!specifiers.length) {
                print('{}');
            } else if (isExportDefaultSpecifier(first) && !rest.length) {
                traverse(first);
            } else {
                if (isExportDefaultSpecifier(first)) {
                    traverse(first);
                    print(',');
                    print.space();
                } else {
                    rest.unshift(first);
                }
                
                print('{');
                
                indent.inc();
                maybe.print.newline(isNewline);
                
                const lastIndex = n - 1;
                
                for (const [i, spec] of rest.entries()) {
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
                print('}');
            }
            
            const source = path.get('source');
            
            if (exists(source)) {
                print(' from ');
                traverse(source);
                printAttributes(path, 'with', printer);
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
