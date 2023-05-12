'use strict';

const {isNext} = require('../is');

module.exports.TSModuleDeclaration = {
    print(path, {print}) {
        print('declare namespace ');
        print('__id');
        print.space();
        print('__body');
    },
    afterSatisfy: () => [
        isNext,
    ],
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
