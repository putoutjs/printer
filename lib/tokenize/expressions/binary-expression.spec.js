'use strict';

const {extend} = require('supertape');
const {parse} = require('putout');

const {print} = require('../../printer');
const {printExtension} = require('../../../test/printer');
const {readFixtures} = require('../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: binary-expression: parens', (t) => {
    t.print(fixture.binaryExpressionParens);
    t.end();
});

test('printer: tokenizer: binary-expression: space', (t) => {
    const ast = parse(fixture.binaryExpressionSpace);
    
    const result = print(ast, {
        format: {
            space: '',
        },
    });
    
    t.equal(result, fixture.binaryExpressionSpaceFix);
    t.end();
});
