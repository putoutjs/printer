import {types} from '@putout/babel';
import {isNext, callWithParent} from '#is';
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
    after(path, {print, maybe}) {
        print.newline();
        maybe.print.newline(!isVarAfterFn(path));
    },
};

function isVarAfterFn(path) {
    const next = path.getNextSibling();
    
    if (isBlockStatement(path.parentPath))
        return true;
    
    if (!isVariableDeclaration(next))
        return false;
    
    const {declaration} = path.node;
    
    return isFunction(declaration);
}

