'use strict';

const {extend} = require('supertape');
const {parse} = require('putout');
const {print} = require('../../../printer');

const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');

const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: if-statement', (t) => {
    t.print(fixture.ifStatement);
    t.end();
});

test('printer: tokenizer: if-newline', (t) => {
    t.print(fixture.ifNewline);
    t.end();
});

test('printer: tokenizer: if-nested', (t) => {
    t.print(fixture.ifNested);
    t.end();
});

test('printer: tokenizer: if-nested: no body', (t) => {
    t.print(fixture.ifNestedNoBody);
    t.end();
});

test('printer: tokenizer: ifSpaces', (t) => {
    const ast = parse(fixture.ifSpaces);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
            splitter: ' ',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.ifSpacesFix);
    t.end();
});

test('printer: tokenizer: if: splitter', (t) => {
    const ast = parse(fixture.ifSplitter);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
            splitter: ' ',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.ifSplitterFix);
    t.end();
});

test('printer: tokenizer: if: else', (t) => {
    t.print(fixture.ifElse);
    t.end();
});

test('printer: tokenizer: if: else: var', (t) => {
    t.print(fixture.ifElseVar);
    t.end();
});

test('printer: tokenizer: if: else: indent', (t) => {
    t.print(fixture.ifElseIndent);
    t.end();
});

test('printer: tokenizer: if: return: else', (t) => {
    t.print(fixture.ifReturnElse);
    t.end();
});

test('printer: tokenizer: if: return: else: last', (t) => {
    t.print(fixture.ifReturnElseLast);
    t.end();
});

test('printer: tokenizer: if: empty-inside-body', (t) => {
    t.print(fixture.ifEmptyInsideBody);
    t.end();
});
