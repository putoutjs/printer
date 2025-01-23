'use strict';

const {createTest} = require('#test');
const {lint} = require('@putout/eslint/lint');
const eslintPluginPutout = require('eslint-plugin-putout');
const {fixture, test} = createTest(__dirname);
const keywordSpacing = eslintPluginPutout.rules['keyword-spacing'];

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
