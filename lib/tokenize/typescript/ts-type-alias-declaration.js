'use strict';

const {isLast} = require('../is');
const {markAfter} = require('../mark');
const isNextType = (a) => a.getNextSibling().isTSTypeAliasDeclaration();

module.exports.TSTypeAliasDeclaration = {
    print(path, {print, maybe, store}) {
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
        
        const is = store(isLast(path));
        maybe.print.newline(!is);
    },
    afterIf(path, {store}) {
        const last = store();
        
        if (last)
            return false;
        
        if (isNextType(path))
            return false;
        
        return true;
    },
    after(path, {print}) {
        print.newline();
        markAfter(path);
    },
};
