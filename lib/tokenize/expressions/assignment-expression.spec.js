'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../test/printer');
const {readFixtures} = require('../../../test/fixture');
const {parse} = require('putout');
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
