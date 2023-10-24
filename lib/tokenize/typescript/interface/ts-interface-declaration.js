'use strict';

const {
    isTSTypeAliasDeclaration,
    isExportDeclaration,
} = require('@putout/babel').types;

const {isNext, isNextParent} = require('../../is');
const {maybeDeclare} = require('../../maybe/maybe-declare');

module.exports.TSInterfaceDeclaration = {
    print: maybeDeclare((path, {print, indent, maybe}) => {
        const {node, parentPath} = path;
        
        maybe.indent(!isExportDeclaration(parentPath));
        print('interface ');
        print('__id');
        
        if (node.extends) {
            print(' extends ');
            path
                .get('extends')
                .map(print);
        }
        
        print('__typeParameters');
        print('__body');
    }),
    afterSatisfy: () => [isNext, isNextParent],
    after(path, {print}) {
        print.breakline();
        
        const next = path.parentPath.getNextSibling();
        
        if (!isTSTypeAliasDeclaration(next) && !isExportDeclaration(next))
            print.breakline();
    },
};

