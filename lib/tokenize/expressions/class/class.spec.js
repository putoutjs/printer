'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const {parse} = require('putout');
const {print} = require('../../../printer');

const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: expressions: class', (t) => {
    t.print(fixture.class);
    t.end();
});

test('printer: tokenizer: expressions: class: extends', (t) => {
    t.print(fixture.classExtends);
    t.end();
});

test('printer: tokenizer: expressions: class declaration: decorators', (t) => {
    t.print(fixture.classDeclarationDecorators);
    t.end();
});

test('printer: tokenizer: expressions: class declaration: new-line', (t) => {
    t.print(fixture.classDeclarationNewLine);
    t.end();
});

test('printer: tokenizer: expressions: class-declaration: spaces', (t) => {
    const ast = parse(fixture.classDeclarationSpaces);
    
    const result = print(ast, {
        format: {
            space: '',
        },
    });
    
    t.equal(result, fixture.classDeclarationSpacesFix);
    t.end();
});

test('printer: tokenizer: expressions: class: switch', (t) => {
    t.print(fixture.classSwitch);
    t.end();
});

test('printer: tokenizer: expressions: class-accessor-property', (t) => {
    t.print(fixture.classAccessorProperty);
    t.end();
});
