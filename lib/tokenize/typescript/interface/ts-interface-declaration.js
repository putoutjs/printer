'use strict';

const {types} = require('@putout/babel');

const {isNext, isNextParent} = require('../../is');
const {maybeDeclare} = require('../../maybe/maybe-declare');
const {markAfter} = require('../../mark');

const {
    isTSTypeAliasDeclaration,
    isExportNamedDeclaration,
    isTSModuleBlock,
} = types;

const isInsideNamespace = (path) => isTSModuleBlock(path.parentPath.parentPath);

module.exports.TSInterfaceDeclaration = {
    print: maybeDeclare((path, {print, maybe}) => {
        const {node} = path;
        
        maybe.indent(!isExportNamedDeclaration(path.parentPath));
        print('interface ');
        print('__id');
        
        if (node.extends) {
            print(' extends ');
            
            const extendsPaths = path.get('extends');
            const n = extendsPaths.length - 1;
            
            for (const [i, current] of extendsPaths.entries()) {
                print(current);
                maybe.print(i < n, ', ');
            }
        }
        
        print('__typeParameters');
        print('__body');
    }),
    afterSatisfy: () => [isNext, isNextParent],
    after(path, {print}) {
        print.linebreak();
        const exportNamed = isExportNamedDeclaration(path.parentPath);
        
        if (exportNamed && isInsideNamespace(path))
            markAfter(path);
        
        if (!exportNamed && !isTSTypeAliasDeclaration(path))
            print.newline();
    },
};
