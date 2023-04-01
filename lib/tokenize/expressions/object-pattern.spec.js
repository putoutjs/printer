'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../test/printer');
const {readFixtures} = require('../../../test/fixture');
const {parse, transform} = require('../../../../putout/packages/putout');
const {print} = require('../../printer');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: object-pattern', (t) => {
    const source = fixture.objectPattern;
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: [
            'extract-object-properties',
        ],
    });
    
    const result = print(ast);
    const expected = fixture.objectPatternFix;
    
    t.equal(result, expected);
    t.end();
});
