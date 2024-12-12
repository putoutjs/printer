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

test('printer: tokenizer: logical-expression: newline', (t) => {
    t.print(fixture.logicalExpressionNewline);
    t.end();
});

test('printer: tokenizer: logical-expression: override', (t) => {
    const ast = parse(fixture.logicalExpressionOverride);
    
    const result = print(ast, {
        semantics: {
            maxElementsInOneLine: 10,
        },
    });
    
    t.equal(result, fixture.logicalExpressionOverrideFix);
    t.end();
});
