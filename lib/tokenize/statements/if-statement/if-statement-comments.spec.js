import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: if: trailing-comment: block', (t) => {
    t.print(fixture.ifTrailingCommentBlock);
    t.end();
});

test('printer: tokenizer: if: trailing-comment: line', (t) => {
    t.print(fixture.ifTrailingCommentLine);
    t.end();
});
