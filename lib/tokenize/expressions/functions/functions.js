'use strict';

const {ArrowFunctionExpression} = require('./arrow-function-expression');
const {FunctionDeclaration} = require('./function-declaration');

const {
    ClassMethod,
    ClassPrivateMethod,
} = require('./class-method');

const {ObjectMethod} = require('./object-method');
const {FunctionExpression} = require('./function-expression');

module.exports.FunctionDeclaration = FunctionDeclaration;
module.exports.FunctionExpression = FunctionExpression;
module.exports.ArrowFunctionExpression = ArrowFunctionExpression;
module.exports.ClassMethod = ClassMethod;
module.exports.ClassPrivateMethod = ClassPrivateMethod;
module.exports.ObjectMethod = ObjectMethod;
