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

const needsSemicolon = createTypeChecker([
    '-: -> ClassDeclaration',
    '+: -> !FunctionDeclaration',
]);

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
        maybe.print(needsSemicolon(declaration), ';');
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
