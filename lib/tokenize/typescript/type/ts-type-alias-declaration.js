'use strict';

const {
    isLast,
    isNext,
    isNextParent,
} = require('../../is');

const {markAfter} = require('../../mark');
const {maybeDeclare} = require('../../maybe/maybe-declare');

const isNextType = (a) => a
    .getNextSibling()
    .isTSTypeAliasDeclaration();

const isNextExport = (a) => a
    .getNextSibling()
    .isExportDeclaration();

module.exports.TSTypeAliasDeclaration = {
    beforeIf: (path) => !path.parentPath.isExportDeclaration(),
    before: (path, {indent}) => {
        indent();
    },
    print: maybeDeclare((path, {print, maybe, store}) => {
        const typeAnnotation = path.get('typeAnnotation');
        const isConditional = typeAnnotation.isTSConditionalType();
        
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
    afterIf(path, {store}) {
        const last = store();
        
        if (last)
            return false;
        
        if (!isNext(path) && !isNextParent(path))
            return false;
        
        return !isNextType(path);
    },
    after(path, {print, maybe}) {
        maybe.indent(isNextExport(path));
        print.newline();
        markAfter(path);
    },
};
