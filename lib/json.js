import {types} from '@putout/babel';
import {isJSONGroup} from '@putout/operator-json';

const {
    isCallExpression,
    isIdentifier,
} = types;

export const maybeJSON = (ast, overrides) => {
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
                escapeSingleQuote: false,
                escapeDoubleQuote: true,
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
    
    return isJSONGroup(callee.name);
}
