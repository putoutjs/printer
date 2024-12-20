'use strict';

const {types} = require('@putout/babel');
const {isJSON} = require('@putout/operator-json');

const {
    isCallExpression,
    isIdentifier,
} = types;

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
                encodeDoubleQuote: true,
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
