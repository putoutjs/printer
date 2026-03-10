import {types} from '@putout/babel';
import {markAfter} from '#mark';
import {maybeDeclare} from '#maybe-declare';
import {createTypeChecker} from '#type-checker';
import {
    callWithNext,
    isLast,
    isNext,
} from '#is';

const {
    isTSTypeAliasDeclaration,
    isExportDeclaration,
    isTSConditionalType,
} = types;

const isNextType = callWithNext(isTSTypeAliasDeclaration);
const isNextExport = callWithNext(isExportDeclaration);

const beforeIf = createTypeChecker([
    '+: parentPath -> !ExportNamedDeclaration',
]);

const isStore = (a, {store}) => store();

const noNextAndNextParent = createTypeChecker([
    ['-', isNext],
    ['+: parentPath -> !', isNext],
]);

const afterIf = createTypeChecker([
    ['-', isStore],
    ['-', noNextAndNextParent],
    ['+: -> !', isNextType],
]);

export const TSTypeAliasDeclaration = {
    beforeIf,
    before: (path, {indent}) => {
        indent();
    },
    print: maybeDeclare((path, {print, maybe, store}) => {
        const typeAnnotation = path.get('typeAnnotation');
        const isConditional = isTSConditionalType(typeAnnotation);
        
        print('type ');
        print('__id');
        print('__typeParameters');
        
        print.space();
        print('=');
        maybe.print.space(!isConditional);
        
        print('__typeAnnotation');
        print(';');
        
        const is = store(isLast(path) || isLast(path.parentPath));
        maybe.print.newline(!is);
    }),
    afterIf,
    after(path, {print, maybe}) {
        maybe.indent(isNextExport(path));
        print.newline();
        markAfter(path);
    },
};

