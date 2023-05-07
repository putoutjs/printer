'use strict';

module.exports.ExportAllDeclaration = (path, {print}) => {
    print('export * from ');
    print('__source');
    print(';');
};
