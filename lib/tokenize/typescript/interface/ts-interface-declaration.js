'use strict';

const {
    isTSTypeAliasDeclaration,
    isExportDeclaration,
} = require('@putout/babel').types;

const {isNext, isNextParent} = require('../../is');
const {maybeDeclare} = require('../namespace/maybeDeclare');

module.exports.TSInterfaceDeclaration = {
    print: maybeDeclare((path, {print, indent}) => {
        indent();
        print('interface ');
        print('__id');
        print('__typeParameters');
        print('__body');
    }),
    afterSatisfy: () => [isNext, isNextParent],
    after(path, {print}) {
        const next = path.parentPath.getNextSibling();
        
        print.breakline();
        
        if (!isTSTypeAliasDeclaration(next) && !isExportDeclaration(next))
            print.breakline();
    },
};

