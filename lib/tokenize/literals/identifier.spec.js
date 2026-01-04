import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {parse, transform} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: literals: identifier: brace', (t) => {
    t.print(fixture.identifierBrace);
    t.end();
});

test('printer: tokenize: literals: identifier: type inside SequenceExpression', (t) => {
    const source = 'let a: i8 = 5';
    
    const ast = parse(source, {
        printer: 'putout',
        isTS: true,
    });
    
    transform(ast, source, {
        plugins: [
            ['convert', {
                report: () => '',
                replace: () => ({
                    'let __a: i8 = __b': '__a, db, __b',
                }),
            }],
        ],
    });
    
    const result = print(ast);
    const expected = '(a, db, 5);\n';
    
    t.equal(result, expected);
    t.end();
});

test('printer: tokenize: literals: identifier: type inside AssignmentExpression', (t) => {
    const source = 'let a: i8 = 5';
    
    const ast = parse(source, {
        printer: 'putout',
        isTS: true,
    });
    
    transform(ast, source, {
        plugins: [
            ['convert', {
                report: () => '',
                replace: () => ({
                    'let __a: i8 = __b': '__a.db = __b',
                }),
            }],
        ],
    });
    
    const result = print(ast);
    const expected = 'a.db = 5;\n';
    
    t.equal(result, expected);
    t.end();
});
