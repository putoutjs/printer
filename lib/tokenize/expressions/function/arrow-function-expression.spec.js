import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {parse, transform} from 'putout';
import {createTest} from '#test';
import {print} from '../../../printer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: functions: arrow-function-expression', (t) => {
    t.print(fixture.arrowFunctionExpression);
    t.end();
});

test('printer: tokenizer: functions: arrow-function-expression-parens', (t) => {
    t.print(fixture.arrowFunctionExpressionParens);
    t.end();
});

test('printer: tokenizer: functions: arrow-function-expression: async + typeParameters', (t) => {
    t.print(fixture.arrowAsyncTypeParameters);
    t.end();
});

test('printer: tokenizer: functions: arrow-function-expression: newline: var', (t) => {
    t.print(fixture.arrowNewlineVar);
    t.end();
});

test('printer: tokenizer: functions: arrow-function-expression: space', (t) => {
    const ast = parse(fixture.arrowSpace);
    const result = print(ast, {
        format: {
            space: '',
            newline: '',
            indent: '',
            endOfFile: '',
        },
        semantics: {
            roundBraces: false,
        },
    });
    
    t.equal(result, fixture.arrowSpaceFix);
    t.end();
});

test('printer: transform: expressions: functions: ArrowFunctionExpression: newline', (t) => {
    const source = fixture.arrowFunctionExpressionNewline;
    const ast = parse(source);
    
    transform(ast, source, {
        rules: {
            'putout': 'off',
            'putout/apply-vars': 'on',
            'putout/convert-method-to-property': 'on',
        },
        plugins: ['putout'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.arrowFunctionExpressionNewlineFix);
    t.end();
});
