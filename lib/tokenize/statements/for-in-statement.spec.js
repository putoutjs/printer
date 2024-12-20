'use strict';

const {extend} = require('supertape');

const {parse} = require('putout');
const {printExtension} = require('../../../test/printer');
const {readFixtures} = require('../../../test/fixture');

const {print} = require('../../printer');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: statement: for-in: space', (t) => {
    const ast = parse(fixture.forInSpace);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.forInSpaceFix);
    t.end();
});
