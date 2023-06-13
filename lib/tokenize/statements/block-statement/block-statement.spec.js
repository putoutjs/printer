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
