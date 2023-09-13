'use strict';

const {isNext, isNextParent} = require('../../is');
const {
    isTSTypeAliasDeclaration,
    isExportDeclaration,
} = require('@putout/babel').types;

module.exports.TSInterfaceDeclaration = {
    print(path, {print}) {
        print('interface ');
        print('__id');
        print('__body');
    },
    afterSatisfy: () => [isNext, isNextParent],
    after(path, {print}) {
        const next = path.parentPath.getNextSibling();
        
        print.breakline();
        
        if (!isTSTypeAliasDeclaration(next) && !isExportDeclaration(next))
            print.breakline();
    },
};
