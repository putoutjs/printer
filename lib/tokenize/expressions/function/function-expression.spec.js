import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {parse} from 'putout';
import {createTest} from '#test';
import {print} from '../../../printer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: functions: expression: space', (t) => {
    const ast = parse(fixture.functionExpression, {
        printer: 'putout',
    });
    
    const result = print(ast, {
        format: {
            space: '',
            newline: '',
            indent: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.functionExpressionFix);
    t.end();
});

test('printer: tokenizer: functions: expression: iife', (t) => {
    t.print(fixture.functionExpressionIife);
    t.end();
});
