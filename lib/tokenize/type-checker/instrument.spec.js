import {stub} from 'supertape';
import {createTest} from '#test';
import {createTypeChecker} from '#type-checker';
import {getCoverage, instrument} from '#type-checker/instrument';

const {test} = createTest(import.meta.url);

test('printer: type-checker: instrument', (t) => {
    const hasFnBody = ({node}) => node.body.body.length;
    const isInsideExportDefaultWithBody = createTypeChecker([
        ['+', hasFnBody],
    ]);
    
    const path = {
        type: 'FunctionDeclaration',
        node: {
            body: {
                body: [1],
            },
        },
    };
    
    isInsideExportDefaultWithBody(path);
    
    const coverage = getCoverage();
    
    t.ok(coverage instanceof Map);
    t.end();
});

test('@putout/printer: type-checker: instrument', (t) => {
    const typeNames = [
        '+: -> StringLiteral',
    ];
    
    const fn = stub().returns([1, true]);
    const coverage = new Map();
    
    const check = instrument(typeNames, fn, {
        coverage,
        env: {
            TYPE_CHECK: '1',
        },
    });
    
    const path = {};
    
    check(path);
    
    t.equal(coverage.size, 1);
    t.end();
});
