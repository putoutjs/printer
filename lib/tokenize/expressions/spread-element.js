'use strict';

const {hasTrailingComment} = require('../is');

module.exports.SpreadElement = (path, printer) => {
    const {print} = printer;
    print('...');
    print('__argument');
    
    if (hasTrailingComment(path))
        print(',');
};
