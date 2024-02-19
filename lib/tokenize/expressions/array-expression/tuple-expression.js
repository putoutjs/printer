'use strict';

const {ArrayExpression} = require('./array-expression');
const {maybeVisitor} = require('../../maybe');

module.exports.TupleExpression = (path, operations, semantics) => {
    const {write} = operations;
    write('#');
    maybeVisitor(ArrayExpression, path, operations, semantics);
};
