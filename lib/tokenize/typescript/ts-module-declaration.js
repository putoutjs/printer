'use strict';

module.exports.TSModuleBlock = (path, {print, traverse, indent}) => {
    print('{');
    print.breakline();
    indent.inc();
    
    for (const child of path.get('body'))
        traverse(child);
    
    indent.dec();
    print('}');
};

module.exports.TSModuleDeclaration = (path, {print}) => {
    print('declare namespace ');
    print('__id');
    print.space();
    print('__body');
};
