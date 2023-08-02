'use strict';

const {extend} = require('supertape');
const {Identifier} = require('@babel/types');

const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const fixture = readFixtures(__dirname);

const {parse, transform} = require('putout');
const {print} = require('../../../printer');

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: typescript: ts-type-parameter', (t) => {
    t.print(fixture.tsTypeParameter);
    t.end();
});

test('printer: tokenizer: typescript: ts-type-parameter: babel 8', (t) => {
    const ast = parse(fixture.tsTypeParameterBabel8, {
        isTS: true,
    });
    
    const [param] = ast.program.body[0].typeParameters.params;
    const {name} = param;
    
    param.name = Identifier(name);
    
    const result = print(ast);
    
    t.equal(result, fixture.tsTypeParameterBabel8);
    t.end();
});

