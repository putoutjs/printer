'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: statement: empty: after interface', (t) => {
    t.print(fixture.emptyStatementAfterInterface);
    t.end();
});
