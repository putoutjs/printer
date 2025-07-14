'use strict';

const {createTest} = require('#test');
const {lint} = require('@putout/eslint/lint');
const {fixture, test} = createTest(__dirname);

test('putout: printer: statement: try-statement', (t) => {
    t.print(fixture.tryStatement);
    t.end();
});

test('putout: printer: statement: try-statement: align with eslint-plugin-putout: keyword-spacing', async (t) => {
    const {safeRules} = await import('eslint-plugin-putout');
    const [code] = lint(fixture.tryStatement, {
        rules: {
            'putout/putout': ['error', {
                ignore: ['!**/fixture'],
                rules: {
                    ...safeRules,
                },
            }],
        },
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
