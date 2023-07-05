'use strict';

const {ObjectExpression} = require('./object-expression');

module.exports.RecordExpression = (path, operations, semantics) => {
    const {write} = operations;
    write('#');
    ObjectExpression(path, operations, semantics);
};
