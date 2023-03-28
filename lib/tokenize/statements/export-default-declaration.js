'use strict';

module.exports.ExportDefaultDeclaration = (path, {print}) => {
    print('export default ');
    print('__declaration');
    print(';');
};
