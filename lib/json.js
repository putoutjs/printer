'use strict';

const {
    isCallExpression,
    isIdentifier,
} = require('@putout/babel').types;

const {isJSON} = require('@putout/processor-json/is-json');
const {assign} = Object;

module.exports.maybeJSON = (ast, overrides) => {
    if (isASTJSON(ast))
        assign(overrides, {
            format: {
                quote: `"`,
            },
            semantics: {
                trailingComma: false,
            },
        });
};

function isASTJSON(ast) {
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
}
