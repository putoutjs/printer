import {
    parse,
    template,
    types,
} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const {test, fixture} = createTest(import.meta.url);
const {stringLiteral} = types;

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

test('printer: tokenizer: literals: string-literal: benign', (t) => {
    t.print(fixture.stringLiteralBenign);
    t.end();
});

test('printer: tokenizer: literals: string-literal: template.ast: slash-n', (t) => {
    const ast = template.ast(fixture.stringLiteralTemplateAst);
    const result = print(ast);
    
    t.equal(result, fixture.stringLiteralTemplateAst);
    t.end();
});

test('printer: tokenizer: literals: string-literal: template.ast: double quotes', (t) => {
    const ast = template.ast(fixture.stringLiteralTemplateAstDoubleQuotes);
    const result = print(ast);
    
    t.equal(result, fixture.stringLiteralTemplateAstDoubleQuotesFix);
    t.end();
});

test('printer: tokenizer: literals: string-literal: no raw: slash-n', (t) => {
    const ast = stringLiteral('hello\n');
    const result = print(ast);
    
    t.equal(result, fixture.stringLiteralNoRawSlashN);
    t.end();
});

test('printer: tokenizer: literals: string-literal: no raw: carriage return', (t) => {
    const ast = stringLiteral('a\rb');
    const result = print(ast);
    
    t.equal(result, fixture.stringLiteralNoRawCarriageReturn);
    t.end();
});

test('printer: tokenizer: literals: string-literal: no raw: backslash', (t) => {
    const ast = stringLiteral('a\\b');
    const result = print(ast);
    
    t.equal(result, fixture.stringLiteralNoRawBackslash);
    t.end();
});

test('printer: tokenizer: literals: string-literal: no raw: single quote', (t) => {
    const ast = stringLiteral(`it's`);
    const result = print(ast);
    
    t.equal(result, fixture.stringLiteralNoRawSingleQuote);
    t.end();
});

test('printer: tokenizer: literals: string-literal: no raw: backslash before quote', (t) => {
    const ast = stringLiteral(`\\'`);
    const result = print(ast);
    
    t.equal(result, fixture.stringLiteralNoRawBackslashBeforeQuote);
    t.end();
});

test('printer: tokenizer: literals: string-literal: no raw: plain', (t) => {
    const ast = stringLiteral('hello');
    const result = print(ast);
    
    t.equal(result, fixture.stringLiteralNoRawPlain);
    t.end();
});

test('printer: tokenizer: literals: string-literal: extra.raw is stale: value is used', (t) => {
    const ast = template.ast(`const a = 'hello'`);
    const [{init}] = ast.declarations;
    
    init.value = 'bye\n';
    
    const result = print(ast);
    
    t.equal(result, fixture.stringLiteralStaleRawFix);
    t.end();
});

test('printer: tokenizer: literals: string-literal: no raw: double quote', (t) => {
    const result = print(stringLiteral('say "hi"'));
    
    t.equal(result, fixture.stringLiteralNoRawDoubleQuote);
    t.end();
});
