'use strict';

const {isLast, isNext} = require('../../is');
const {markAfter} = require('../../mark');
const {maybeDeclare} = require('../../maybe/maybe-declare');
const isNextType = (a) => a.getNextSibling().isTSTypeAliasDeclaration();

module.exports.TSTypeAliasDeclaration = {
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
        
        return !isNextType(path);
    },
    after(path, {maybe}) {
        maybe.print.newline(isNext(path) || isNext(path.parentPath));
        markAfter(path);
    },
};
