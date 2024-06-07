'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');

const {parse} = require('putout');

const {print} = require('../../../printer');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

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
