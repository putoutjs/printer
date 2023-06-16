'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../test/printer');
const {readFixtures} = require('../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

const {parse, transform} = require('putout');

const {print} = require('../../../../printer');

test('printer: tokenize: literals: regexp', (t) => {
    const source = fixture.regexp;
    
    const ast = parse(source, {
        printer: 'putout',
    });
    
    transform(ast, source, {
        plugins: ['regexp'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.regexpFix);
    t.end();
});

test('printer: tokenizer: literals: identifier: brace', (t) => {
    t.print(fixture.identifierBrace);
    t.end();
});
