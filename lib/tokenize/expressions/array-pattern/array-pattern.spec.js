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

test('printer: tokenizer: array-pattern: space', (t) => {
    const ast = parse(fixture.arrayPatternSpace);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.arrayPatternSpaceFix);
    t.end();
});

test('printer: tokenizer: array-pattern: max-elements', (t) => {
    t.print(fixture.arrayPatternMaxElements, {
        semantics: {
            maxElementsInOnLine: 5,
        },
    });
    t.end();
});
