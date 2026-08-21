import {types} from '@putout/babel';
import {isSQL} from '@putout/operator-json';

const {
    isCallExpression,
    isIdentifier,
} = types;

export const maybeSQL = (ast, overrides) => {
    if (isASTSQL(ast))
        return {
            ...overrides,
            semantics: {
                ...overrides?.semantics,
                maxArgsInOneLine: 1,
            },
        };
    
    return overrides;
};

function isASTSQL(ast) {
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
    
    return isSQL(callee.name);
}
