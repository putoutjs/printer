'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../test/printer');
const {readFixtures} = require('../../../test/fixture');

const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: expressions: class', (t) => {
    t.print(fixture.class);
    t.end();
});

test('printer: tokenizer: expressions: class declaration: decorators', (t) => {
    t.print(fixture.classDeclarationDecorators);
    t.end();
});
