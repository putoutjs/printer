'use strict';

const {
    isTSTypeAliasDeclaration,
    isExportDeclaration,
} = require('@putout/babel').types;

const {isNext, isNextParent} = require('../../is');
const {maybeDeclare} = require('../../maybe/maybe-declare');

module.exports.TSInterfaceDeclaration = {
    print: maybeDeclare((path, {print, indent}) => {
        const {node} = path;
        
        indent();
        print('interface ');
        print('__id');
        
        if (node.extends) {
            print(' extends ');
            path.get('extends').map(print);
        }
        
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
