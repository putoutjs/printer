'use strict';

const {ArrayExpression} = require('./array-expression');
const {maybePlugin} = require('../../maybe');

module.exports.TupleExpression = (path, operations, semantics) => {
    const {write} = operations;
    write('#');
    maybePlugin(ArrayExpression, path, operations, semantics);
};
