import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: TSMappedType: nameType', (t) => {
    t.print(fixture.tsMappedTypeNameType);
    t.end();
});

test('printer: tokenizer: typescript: TSMappedType: in', (t) => {
    t.print(fixture.tsMappedTypeIn);
    t.end();
});

test('printer: tokenizer: typescript: TSMappedType: no type annotation', (t) => {
    t.print(fixture.tsMappedTypeNoTypeAnnotation);
    t.end();
});
