import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: interface: empty', (t) => {
    t.print(fixture.interfaceEmpty);
    t.end();
});

test('printer: tokenizer: typescript: interface: readonly', (t) => {
    t.print(fixture.interfaceReadonly);
    t.end();
});

test('printer: tokenizer: typescript: interface: type', (t) => {
    t.print(fixture.interfaceType);
    t.end();
});

test('printer: tokenizer: typescript: interface: newline', (t) => {
    t.print(fixture.interfaceNewline);
    t.end();
});

test('printer: tokenizer: typescript: interface: declare', (t) => {
    t.print(fixture.interfaceDeclare);
    t.end();
});

test('printer: tokenizer: typescript: interface: extends', (t) => {
    t.print(fixture.interfaceExtends);
    t.end();
});

test('printer: tokenizer: typescript: interface: couple extends', (t) => {
    t.print(fixture.interfaceCoupleExtends);
    t.end();
});

test('printer: tokenizer: typescript: interface: type parameters', (t) => {
    t.print(fixture.interfaceTypeParameters);
    t.end();
});
