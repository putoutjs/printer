import {types} from '@putout/babel';
import {isNext, isNextParent} from '#is';
import {maybeDeclare} from '../../maybe/maybe-declare.js';
import {markAfter} from '../../mark.js';

const {
    isTSTypeAliasDeclaration,
    isExportNamedDeclaration,
    isTSModuleBlock,
} = types;

const isInsideNamespace = (path) => isTSModuleBlock(path.parentPath.parentPath);

export const TSInterfaceDeclaration = {
    print: maybeDeclare((path, {print, maybe}) => {
        const {node} = path;
        const {typeParameters} = node;
        
        maybe.indent(!isExportNamedDeclaration(path.parentPath));
        print('interface ');
        print('__id');
        
        print('__typeParameters');
        
        if (node.extends) {
            if (!typeParameters || typeParameters.length < 2)
                print(' ');
            
            print('extends ');
            
            const extendsPaths = path.get('extends');
            const n = extendsPaths.length - 1;
            
            for (const [i, current] of extendsPaths.entries()) {
                print(current);
                maybe.print(i < n, ', ');
            }
        }
        
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
