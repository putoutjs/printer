'use strict';

const {createTest} = require('#test');
const {parse, transform} = require('putout');

const {print} = require('#printer');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: statement: block', (t) => {
    t.print(fixture.blockStatement);
    t.end();
});

test('printer: tokenizer: statement: block: newline', (t) => {
    t.print(fixture.blockNewline);
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

test('printer: tokenizer: statement: block: inside chain', (t) => {
    t.print(fixture.blockInsideChain);
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
            endOfFile: '',
        },
        semantics: {
            comments: false,
        },
    });
    
    t.equal(result, fixture.blockStatementNoCommentsFix);
    t.end();
});
