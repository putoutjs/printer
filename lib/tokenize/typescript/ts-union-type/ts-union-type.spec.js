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

test('printer: tokenizer: typescript: ts-union-type', (t) => {
    t.print(fixture.tsUnionType);
    t.end();
});

test('printer: tokenizer: typescript: ts-union-type: more', (t) => {
    t.print(fixture.tsUnionTypeMore);
    t.end();
});

test('printer: tokenizer: typescript: ts-union-type: inside function', (t) => {
    t.print(fixture.tsUnionTypeInsideFunction);
    t.end();
});

test('printer: tokenizer: ts-union-type: override', (t) => {
    const ast = parse(fixture.tsUnionTypeOverride, {
        isTS: true,
    });
    
    const result = print(ast, {
        semantics: {
            maxTypesInOneLine: 5,
        },
    });
    
    t.equal(result, fixture.tsUnionTypeOverrideFix);
    t.end();
});
