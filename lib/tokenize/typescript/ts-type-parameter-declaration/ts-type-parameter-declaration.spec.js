'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: TSTypeParameterDeclaration', (t) => {
    t.print(fixture.tsTypeParameterDeclaration);
    t.end();
});
