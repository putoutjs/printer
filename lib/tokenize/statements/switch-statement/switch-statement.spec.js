'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('putout: printer: statement: switch-statement', (t) => {
    t.print(fixture.switchStatement, {
        format: {
            indent: '....',
        },
    });
    t.end();
});

test('putout: printer: statement: switch-statement: fall', (t) => {
    t.print(fixture.switchFall);
    t.end();
});

test('putout: printer: statement: switch-statement: var', (t) => {
    t.print(fixture.switchVar);
    t.end();
});
