'use strict';

const {assign} = Object;
const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const {parse} = require('putout');
const {Identifier} = require('@babel/types');
const {print} = require('../../../printer');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: typescript: ts-function-type', (t) => {
    t.print(fixture.tsFunctionType);
    t.end();
});

test('printer: tokenizer: typescript: ts-function-type: babel 8', (t) => {
    const ast = parse(fixture.tsFunctionTypeBabel8, {
        isTS: true,
    });
    
    const [{typeAnnotation}] = ast.program.body[0].typeAnnotation.members;
    
    const fnType = typeAnnotation.typeAnnotation;
    assign(fnType, {
        params: fnType.parameters,
        returnType: fnType.typeAnnotation,
    });
    
    delete fnType.parameters;
    delete fnType.typeAnnotation;
    
    const result = print(ast).slice(0, -1);
    
    t.equal(result, fixture.tsFunctionTypeBabel8);
    t.end();
});

