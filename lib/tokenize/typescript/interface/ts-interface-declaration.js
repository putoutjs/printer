'use strict';

const {isNext, isNextParent} = require('../../is');
const {
    isTSTypeLiteral,
    isTSTypeAliasDeclaration,
} = require('@babel/types');

module.exports.TSInterfaceDeclaration = {
    print(path, {print}) {
        print('interface ');
        print('__id');
        print('__body');
    },
    afterSatisfy: () => [isNext, isNextParent],
    after(path, {print, maybe}) {
        const next = path.parentPath.getNextSibling();
        
        print.breakline();
        maybe.print.breakline(!isTSTypeAliasDeclaration(next));
    },
};

