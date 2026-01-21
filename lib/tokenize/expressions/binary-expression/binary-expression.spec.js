import {parse} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: binary-expression: parens', (t) => {
    t.print(fixture.binaryExpressionParens);
    t.end();
});

test('printer: tokenizer: binary-expression: string', (t) => {
    t.print(fixture.binaryExpressionString);
    t.end();
});

test('printer: tokenizer: binary-expression: minus', (t) => {
    t.print(fixture.binaryExpressionMinus);
    t.end();
});

test('printer: tokenizer: binary-expression: space', (t) => {
    const ast = parse(fixture.binaryExpressionSpace);
    
    const result = print(ast, {
        format: {
            space: '',
        },
    });
    
    t.equal(result, fixture.binaryExpressionSpaceFix);
    t.end();
});

test('printer: tokenizer: binary-expression: unary', (t) => {
    const ast = parse(fixture.binaryExpressionUnary);
    
    const result = print(ast, {
        format: {
            space: '',
        },
    });
    
    t.equal(result, fixture.binaryExpressionUnaryFix);
    t.end();
});

test('printer: tokenizer: binary-expression: in', (t) => {
    const ast = parse(fixture.binaryExpressionIn);
    
    const result = print(ast, {
        format: {
            space: '',
        },
    });
    
    t.equal(result, fixture.binaryExpressionInFix);
    t.end();
});
