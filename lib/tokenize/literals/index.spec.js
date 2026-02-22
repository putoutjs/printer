import {parse, transform} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenize: literals: regexp', (t) => {
    const source = fixture.regexp;
    
    const ast = parse(source, {
        printer: 'putout',
    });
    
    transform(ast, {
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
    
    transform(ast, {
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
