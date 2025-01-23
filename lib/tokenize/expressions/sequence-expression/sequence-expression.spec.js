'use strict';

const {createTest} = require('#test');
const {parse} = require('putout');

const {print} = require('../../../printer');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: sequence-expression', (t) => {
    const source = fixture.sequenceExpression;
    const ast = parse(source);
    
    const result = print(ast, {
        format: {
            space: '',
        },
    });
    
    const expected = fixture.sequenceExpressionFix;
    
    t.equal(result, expected);
    t.end();
});

test('printer: tokenizer: sequence-expression: braces', (t) => {
    const source = fixture.sequenceExpressionRoundBraces;
    const ast = parse(source);
    
    const result = print(ast, {
        semantics: {
            roundBraces: false,
        },
    });
    
    const expected = fixture.sequenceExpressionRoundBracesFix;
    
    t.equal(result, expected);
    t.end();
});

test('printer: tokenizer: sequence-expression: ternary: braces', (t) => {
    const source = fixture.sequenceExpressionTernaryBraces;
    const ast = parse(source);
    
    const result = print(ast, {
        semantics: {
            roundBraces: false,
        },
    });
    
    const expected = fixture.sequenceExpressionTernaryBracesFix;
    
    t.equal(result, expected);
    t.end();
});
