'use strict';

const {isFirst} = require('../is');

module.exports.ExportDefaultDeclaration = (path, {print}) => {
    if (shouldAddNewlineBefore(path))
        print.newline();
    
    print('export default ');
    print('__declaration');
    print(';');
};

function shouldAddNewlineBefore(path) {
    if (isFirst(path))
        return false;
    
    return true;
}
