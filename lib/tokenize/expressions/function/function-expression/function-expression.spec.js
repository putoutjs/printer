import {parse} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const {test, fixture} = createTest(import.meta.url);

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
