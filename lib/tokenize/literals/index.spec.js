'use strict';

const {createTest} = require('#test');
const {parse, transform} = require('putout');

const {print} = require('#printer');
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

test('printer: tokenizer: literals: string-literal', (t) => {
    t.print(fixture.stringLiteral, {
        format: {
            quote: '"',
        },
    });
    t.end();
});

test('printer: tokenizer: literals: string-literal: no escape', (t) => {
    t.print(fixture.stringLiteralNoEscape, {
        format: {
            quote: '"',
        },
        semantics: {
            escapeDoubleQuote: false,
        },
    });
    t.end();
});

test('printer: tokenizer: literals: string-literal: slash-n', (t) => {
    const source = fixture.stringLiteralSlashN;
    const ast = parse(source);
    const result = print(ast, {
        printer: ['putout', {
            format: {
                quote: `'`,
            },
        }],
    });
    
    t.equal(result, fixture.stringLiteralSlashNFix);
    t.end();
});
