'use strict';

module.exports.ExportAllDeclaration = (path, {print}) => {
    const {exportKind} = path.node;
    print('export ');
    
    if (exportKind === 'type')
        print('type ');
    
    print('* from ');
    print('__source');
    print(';');
    print.newline();
};
