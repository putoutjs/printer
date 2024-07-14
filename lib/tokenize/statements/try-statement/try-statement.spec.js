'use strict';

const {extend} = require('supertape');
const {lint} = require('@putout/eslint/lint');
const eslintPluginPutout = require('eslint-plugin-putout');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');

const keywordSpacing = eslintPluginPutout.rules['keyword-spacing'];

const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('putout: printer: statement: try-statement', (t) => {
    t.print(fixture.tryStatement);
    t.end();
});

test('putout: printer: statement: try-statement: align with eslint-plugin-putout: keyword-spacing', (t) => {
    const [code] = lint(fixture.tryStatement, {
        plugins: [
            ['keyword-spacing', keywordSpacing],
        ],
    });
    
    t.equal(code, fixture.tryStatement);
    t.end();
});

test('putout: printer: statement: try-statement: minify', (t) => {
    t.print(fixture.tryStatementMinify, {
        format: {
            space: '',
        },
    });
    t.end();
});
