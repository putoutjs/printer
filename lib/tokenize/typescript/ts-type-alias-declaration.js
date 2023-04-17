'use strict';

const {isLast} = require('../is');
const isNextType = (a) => a.getNextSibling().isTSTypeAliasDeclaration();

module.exports.TSTypeAliasDeclaration = {
    print(path, {print, maybe, store}) {
        print('type ');
        print('__id');
        
        print.space();
        print('=');
        print.space();
        
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
    },
};
