'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

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
