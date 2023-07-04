'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const {parse, transform} = require('putout');
const {print} = require('../../../printer');

const {_getDirectives} = require('./block-statement');

const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: statement: block', (t) => {
    t.print(fixture.blockStatement);
    t.end();
});

test('printer: tokenizer: statement: block: comments', (t) => {
    t.print(fixture.blockStatementComments);
    t.end();
});

test('printer: tokenizer: statement: block: if: nested', (t) => {
    t.print(fixture.blockIfNested);
    t.end();
});

test('printer: tokenizer: statement: block: getDirectives for 🐊promises', (t) => {
    const node = {};
    
    const path = {
        node,
        get() {
            return [];
        },
    };
    
    const result = _getDirectives(path);
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('printer: tokenizer: statement: block: directives', (t) => {
    const source = fixture.blockDirectives;
    const ast = parse(source, {
        printer: 'putout',
    });
    
    const {rules} = require('@putout/plugin-promises');
    
    transform(ast, source, {
        plugins: [
            ['convert-new-promise-to-async', rules['convert-new-promise-to-async']],
        ],
    });
    
    const code = print(ast);
    
    t.equal(code, fixture.blockDirectivesFix);
    t.end();
});

test('printer: tokenizer: block-statement: no comments', (t) => {
    const ast = parse(fixture.blockStatementNoComments);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
        },
        semantics: {
            comments: false,
        },
    });
    
    t.equal(result, fixture.blockStatementNoCommentsFix);
    t.end();
});
