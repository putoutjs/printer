'use strict';

const {
    isCallExpression,
    isIdentifier,
} = require('@babel/types');

const {isJSON} = require('@putout/processor-json/is-json');

module.exports.isASTJSON = (ast) => {
    const {program} = ast;
    
    if (!program)
        return false;
    
    const {body} = ast.program;
    
    if (!body.length)
        return false;
    
    const {expression} = ast.program.body[0];
    
    if (!isCallExpression(expression))
        return false;
    
    const {callee} = expression;
    
    if (!isIdentifier(callee))
        return false;
    
    return isJSON(callee.name);
};
