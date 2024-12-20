'use strict';

const {extend} = require('supertape');

const {parse} = require('putout');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');

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

test('printer: tokenizer: expressions: class: declare', (t) => {
    t.print(fixture.classDeclare);
    t.end();
});

test('printer: tokenizer: expressions: class: property-readonly', (t) => {
    t.print(fixture.classPropertyReadonly);
    t.end();
});

test('printer: tokenizer: expressions: class: superTypeParameters', (t) => {
    t.print(fixture.classDeclarationSuperTypeParameters);
    t.end();
});

test('printer: tokenizer: expressions: class: decorator: comment', (t) => {
    t.print(fixture.classDecoratorComment);
    t.end();
});

test('printer: tokenizer: expressions: class: unnamed', (t) => {
    t.print(fixture.classUnnamed);
    t.end();
});

test('printer: tokenizer: expressions: class: extends, impolements', (t) => {
    t.print(fixture.classExtendsImplements);
    t.end();
});

test('printer: tokenizer: expressions: class: computed', (t) => {
    t.print(fixture.classComputed);
    t.end();
});

test('printer: tokenizer: expressions: class: property: declare', (t) => {
    t.print(fixture.classPropertyDeclare);
    t.end();
});
