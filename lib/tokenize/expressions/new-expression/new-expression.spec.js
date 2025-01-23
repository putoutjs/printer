'use strict';

const {extend} = require('supertape');

const {parse} = require('putout');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');

const {print} = require('../../../printer');

const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

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
