'use strict';

const {createTest} = require('#test');
const {parse} = require('putout');

const {print} = require('../../../printer');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: new-expression', (t) => {
    t.print(fixture.newExpression);
    t.end();
});

test('printer: tokenizer: new-expression: no braces', (t) => {
    const ast = parse(fixture.newExpressionNoBraces);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
            endOfFile: '',
        },
        semantics: {
            roundBraces: false,
        },
    });
    
    t.equal(result, fixture.newExpressionNoBracesFix);
    t.end();
});

test('printer: tokenizer: new-expression: chain', (t) => {
    const ast = parse(fixture.newExpressionChain);
    
    const result = print(ast, {
        semantics: {
            roundBraces: false,
        },
    });
    
    t.equal(result, fixture.newExpressionChainFix);
    t.end();
});
