'use strict';

const {
    isCallExpression,
    isIdentifier,
} = require('@putout/babel').types;

const {isJSON} = require('@putout/operator-json');

module.exports.maybeJSON = (ast, overrides) => {
    if (isASTJSON(ast))
        return {
            ...overrides,
            format: {
                ...overrides?.format,
                quote: `"`,
            },
            semantics: {
                ...overrides?.semantics,
                trailingComma: false,
                encodeSingleQuote: false,
            },
        };
    
    return overrides;
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
