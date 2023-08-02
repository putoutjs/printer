'use strict';

const {assign} = Object;
const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const {parse} = require('putout');
const {print} = require('../../../printer');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: typescript: functions: ts-construct-signature-declaration', (t) => {
    t.print(fixture.tsConstructSignatureDeclaration);
    t.end();
});

test('printer: tokenizer: typescript: functions: ts-construct-signature-declaration: babel 8', (t) => {
    const ast = parse(fixture.tsConstructSignatureDeclarationBabel8, {
        isTS: true,
    });
    
    const [fnType] = ast.program.body[0].body.body;
    
    assign(fnType, {
        params: fnType.parameters,
        returnType: fnType.typeAnnotation,
    });
    
    delete fnType.parameters;
    delete fnType.typeAnnotation;
    
    const result = print(ast).slice(0, -1);
    
    t.equal(result, fixture.tsConstructSignatureDeclarationBabel8);
    t.end();
});
