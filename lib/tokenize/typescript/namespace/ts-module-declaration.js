'use strict';

const {isNext} = require('../../is');
const {maybeDeclare} = require('./maybeDeclare');

module.exports.TSModuleDeclaration = {
    print: maybeDeclare((path, {print}) => {
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
    
    for (const child of path.get('body'))
        traverse(child);
    
    indent.dec();
    print('}');
};
