import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {createTest} from '#test';
import {visitors, maybeVisitor} from './printer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test} = createTest(__dirname);

test('printer: visitors: exported: visitors', async (t) => {
    const {CallExpression} = await import('./tokenize/expressions/index.js');
    
    t.equal(visitors.CallExpression, CallExpression);
    t.end();
});

test('printer: visitors: exported: maybeVisitor', async (t) => {
    const {maybeVisitor: _maybeVisitor} = await import('./tokenize/maybe/index.js');
    
    t.equal(maybeVisitor, _maybeVisitor);
    t.end();
});

test('printer: exported', async (t) => {
    const {printParams: printParamsOriginal} = await import('./tokenize/expressions/function/params.js');
    const {printParams} = await import('@putout/printer/params');
    
    t.equal(printParams, printParamsOriginal);
    t.end();
});
