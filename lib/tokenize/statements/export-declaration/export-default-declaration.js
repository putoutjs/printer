import {types} from '@putout/babel';
import {
    isNext,
    callWithParent,
    callWithNext,
} from '#is';
import {createTypeChecker} from '#type-checker';

const {
    isVariableDeclaration,
    isFunction,
    isBlockStatement,
} = types;

function shouldAddSemicolon(path) {
    if (path.isClassDeclaration())
        return false;
    
    return !path.isFunctionDeclaration();
}

const afterIf = createTypeChecker([
    callWithParent(isBlockStatement),
    isNext,
]);

export const ExportDefaultDeclaration = {
    print(path, {print, traverse, maybe}) {
        const declaration = path.get('declaration');
        print.indent();
        print('export default ');
        traverse(declaration);
        maybe.print(shouldAddSemicolon(declaration), ';');
    },
    afterIf,
    after(path, {print}) {
        print.newline();
        
        if (isNewlineAfter(path))
            print.newline();
    },
};

const isNewlineAfter = createTypeChecker([
    ['-: parentPath -> BlockStatement'],
    ['+: -> !', callWithNext(isVariableDeclaration)],
    ['+: node.declaration -> !', isFunction],
]);
