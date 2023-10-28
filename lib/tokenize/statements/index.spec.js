'use strict';

const {extend} = require('supertape');
const {parse} = require('putout');
const {print} = require('../../printer');

const {printExtension} = require('../../../test/printer');
const {readFixtures} = require('../../../test/fixture');

const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: statements: shebang: newline', (t) => {
    const ast = parse(fixture.shebangNewline);
    
    const result = print(ast, {
        format: {
            indent: '',
            newline: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.shebangNewlineFix);
    t.end();
});
