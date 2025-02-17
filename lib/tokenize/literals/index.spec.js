'use strict';

const {createTest} = require('#test');
const {parse, transform} = require('putout');

const {print} = require('../../../../printer');
const {test, fixture} = createTest(__dirname);

test('printer: tokenize: literals: regexp', (t) => {
    const source = fixture.regexp;
    
    const ast = parse(source, {
        printer: 'putout',
    });
    
    transform(ast, source, {
        plugins: ['regexp'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.regexpFix);
    t.end();
});

test('printer: tokenize: literals: regexp: no raw', (t) => {
    const source = fixture.regexpNoRaw;
    const ast = parse(source, {
        printer: 'putout',
    });
    
    transform(ast, source, {
        plugins: ['tape'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.regexpNoRawFix);
    t.end();
});

test('printer: tokenizer: literals: identifier: brace', (t) => {
    t.print(fixture.identifierBrace);
    t.end();
});

test('printer: tokenizer: literals: directive-literal', (t) => {
    t.print(fixture.directiveLiteral);
    t.end();
});

test('printer: tokenizer: literals: string-literal', (t) => {
    t.print(fixture.stringLiteral, {
        format: {
            quote: '"',
        },
    });
    t.end();
});

test.only('printer: tokenizer: literals: string-literal: newline', (t) => {
    t.print(fixture.stringLiteralNewline, {
        format: {
            quote: `'`,
        },
    });
    t.end();
});

