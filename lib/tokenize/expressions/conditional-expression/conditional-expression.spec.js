import {parse} from 'putout';
import {print} from '#printer';
import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: conditional-expression', (t) => {
    t.print(fixture.conditionalExpression);
    t.end();
});

test('printer: tokenizer: conditional-expression: multiline', (t) => {
    t.print(fixture.conditionalExpressionMultiline);
    t.end();
});

test('printer: tokenizer: conditional-expression: object', (t) => {
    t.print(fixture.conditionalExpressionObject);
    t.end();
});

test('printer: tokenizer: conditional-expression: inside fn', (t) => {
    const ast = parse(fixture.conditionalExpressionInsideFn);
    const result = print(ast);
    
    t.equal(result, fixture.conditionalExpressionInsideFnFix);
    t.end();
});

