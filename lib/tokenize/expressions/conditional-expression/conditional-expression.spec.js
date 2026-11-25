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

test('printer: tokenizer: conditional-expression: comment: line', (t) => {
    const ast = parse(fixture.conditionalExpressionCommentLine);
    const result = print(ast);
    
    t.equal(result, fixture.conditionalExpressionCommentLineFix);
    t.end();
});

test('printer: tokenizer: conditional-expression: comment: own', (t) => {
    const ast = parse(fixture.conditionalExpressionCommentOwn);
    const result = print(ast);
    
    t.equal(result, fixture.conditionalExpressionCommentOwnFix);
    t.end();
});

test('printer: tokenizer: conditional-expression: comment: nested', (t) => {
    const ast = parse(fixture.conditionalExpressionCommentNested);
    const result = print(ast);
    
    t.equal(result, fixture.conditionalExpressionCommentNestedFix);
    t.end();
});

test('printer: tokenizer: conditional-expression: comment: test', (t) => {
    const ast = parse(fixture.conditionalExpressionCommentTest);
    const result = print(ast);
    
    t.equal(result, fixture.conditionalExpressionCommentTestFix);
    t.end();
});

test('printer: tokenizer: conditional-expression: comment: object', (t) => {
    const ast = parse(fixture.conditionalExpressionCommentObject);
    const result = print(ast);
    
    t.equal(result, fixture.conditionalExpressionCommentObjectFix);
    t.end();
});

test('printer: tokenizer: conditional-expression: comment: couple', (t) => {
    const ast = parse(fixture.conditionalExpressionCommentCouple);
    const result = print(ast);
    
    t.equal(result, fixture.conditionalExpressionCommentCoupleFix);
    t.end();
});

test('printer: tokenizer: conditional-expression: comment: return', (t) => {
    const ast = parse(fixture.conditionalExpressionCommentReturn);
    const result = print(ast);
    
    t.equal(result, fixture.conditionalExpressionCommentReturnFix);
    t.end();
});

test('printer: tokenizer: conditional-expression: comment: block', (t) => {
    t.print(fixture.conditionalExpressionCommentBlock);
    t.end();
});

test('printer: tokenizer: conditional-expression: comment: line: no loc', (t) => {
    const ast = parse(fixture.conditionalExpressionCommentLine);
    const [{declarations}] = ast.program.body;
    const [{init}] = declarations;
    
    delete init.test.loc;
    delete init.consequent.loc;
    
    const result = print(ast);
    
    t.equal(result, fixture.conditionalExpressionCommentLineFix);
    t.end();
});
