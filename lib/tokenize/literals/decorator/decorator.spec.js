import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: expressions: decorator', (t) => {
    t.print(fixture.decorator);
    t.end();
});

test('printer: tokenizer: decorator: trailing: line', (t) => {
    t.print(fixture.decoratorTrailingLine);
    t.end();
});

test('printer: tokenizer: decorator: trailing: line: own', (t) => {
    t.print(fixture.decoratorTrailingLineOwn);
    t.end();
});

test('printer: tokenizer: decorator: trailing: block', (t) => {
    t.print(fixture.decoratorTrailingBlock);
    t.end();
});

test('printer: tokenizer: decorator: trailing: block: own', (t) => {
    t.print(fixture.decoratorTrailingBlockOwn);
    t.end();
});

test('printer: tokenizer: decorator: trailing: line: next', (t) => {
    t.print(fixture.decoratorTrailingLineNext);
    t.end();
});

test('printer: tokenizer: decorator: member', (t) => {
    t.print(fixture.decoratorMember);
    t.end();
});

test('printer: tokenizer: decorator: param: line', (t) => {
    t.print(fixture.decoratorParamLine);
    t.end();
});

test('printer: tokenizer: decorator: param: line: own', (t) => {
    t.print(fixture.decoratorParamLineOwn);
    t.end();
});

test('printer: tokenizer: decorator: param: block', (t) => {
    t.print(fixture.decoratorParamBlock);
    t.end();
});

test('printer: tokenizer: decorator: param: second', (t) => {
    t.print(fixture.decoratorParamSecond);
    t.end();
});

test('printer: tokenizer: decorator: param: leading', (t) => {
    t.print(fixture.decoratorParamLeading);
    t.end();
});
