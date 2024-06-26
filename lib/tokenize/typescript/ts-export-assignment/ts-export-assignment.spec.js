'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: typescript: TSExportAssignment', (t) => {
    t.print(fixture.tsExportAssignment);
    t.end();
});

test('printer: tokenizer: typescript: TSExportAssignment: newline', (t) => {
    t.print(fixture.tsExportAssignmentNewline);
    t.end();
});
