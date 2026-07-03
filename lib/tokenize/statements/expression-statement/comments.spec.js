import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: statement: expression: leading comment', (t) => {
    t.print(fixture.expressionLeadingComment);
    t.end();
});

test('printer: tokenizer: statement: expression: comment: same line', (t) => {
    t.print(fixture.expressionCommentSameLine);
    t.end();
});

test('printer: tokenizer: statement: expression: comment: line: assign', (t) => {
    t.print(fixture.expressionCommentLineAssign);
    t.end();
});

test('printer: tokenizer: statement: expression: inside arrow: leading comment', (t) => {
    t.print(fixture.expressionInsideArrowLeadingComment);
    t.end();
});

test('printer: tokenizer: statement: expression: inside body: leading comment', (t) => {
    t.print(fixture.expressionInsideBodyLeadingComment);
    t.end();
});

test('printer: tokenizer: statement: expression: comment: same', (t) => {
    t.print(fixture.expressionCommentLineSame);
    t.end();
});
