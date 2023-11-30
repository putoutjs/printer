'use strict';

const {parseTrailingComments} = require('../comment/comment');

module.exports.SpreadElement = (path, printer, semantics) => {
    const {print} = printer;
    print('...');
    print('__argument');
    parseTrailingComments(path, printer, semantics);
};
