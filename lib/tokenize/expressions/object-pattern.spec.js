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

test('printer: tokenizer: object-pattern', (t) => {
    const source = fixture.objectPattern;
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: [
            'extract-object-properties',
        ],
    });
    
    const result = print(ast);
    const expected = fixture.objectPatternFix;
    
    t.equal(result, expected);
    t.end();
});

test('printer: tokenizer: object-pattern: transform', (t) => {
    const source = fixture.objectPatternTransform;
    const ast = parse(source);
    const printer = require('@putout/plugin-printer');
    
    transform(ast, source, {
        plugins: [
            ['printer', printer],
        ],
    });
    
    const result = print(ast);
    const expected = fixture.objectPatternTransformFix;
    
    t.equal(result, expected);
    t.end();
});

test('printer: tokenizer: object-pattern: nested', (t) => {
    t.print(fixture.objectPatternNested);
    t.end();
});

test('printer: tokenizer: object-pattern-for-of', (t) => {
    t.print(fixture.objectPatternForOf);
    t.end();
});

test('printer: tokenizer: object-pattern: computed', (t) => {
    t.print(fixture.objectPatternComputed);
    t.end();
});
