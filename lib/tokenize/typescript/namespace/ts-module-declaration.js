'use strict';

const {isNext} = require('../../is');
const {maybeDeclare} = require('../../maybe/maybe-declare');

module.exports.TSModuleDeclaration = {
    print: maybeDeclare((path, {print}) => {
        const id = path.get('id');
        
        if (id.isStringLiteral())
            print('module ');
        else
            print('namespace ');
        
        print('__id');
        print.space();
        print('__body');
    }),
    afterSatisfy: () => [isNext],
    after(path, {print}) {
        print.newline();
        print.newline();
    },
};

module.exports.TSModuleBlock = (path, {print, traverse, indent}) => {
    print('{');
    print.breakline();
    indent.inc();
    
    for (const child of path.get('body')) {
        traverse(child);
    }
    
    indent.dec();
    print('}');
};
