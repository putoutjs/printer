'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../test/printer');
const {readFixtures} = require('../../../test/fixture');

const {
    parse,
    transform,
} = require('putout');

const {print} = require('../../printer');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: assignment-expression', (t) => {
    const ast = parse(fixture.assignmentExpression);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
        },
    });
    
    t.equal(result, fixture.assignmentExpressionFix);
    t.end();
});

test('printer: tokenizer: assignment-expression: parens: putout', (t) => {
    const source = fixture.assignmentExpressionParens;
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: ['minify'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.assignmentExpressionParensFix);
    t.end();
});
