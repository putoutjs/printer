import montag from 'montag';
import {types} from '@putout/babel';
import {report} from '#type-checker/report';
import {createTest} from '#test';

const isString = (a) => () => typeof a === 'string';
const {isObjectExpression} = types;
const {test} = createTest(import.meta.url);

test('printer: type-checker: report: empty', (t) => {
    const coverage = new Map();
    const result = report(coverage);
    const expected = [0, '# 🌴 Checkers Covered'];
    
    t.deepEqual(result, expected);
    t.end();
});

test('printer: type-checker: report: count', (t) => {
    const coverage = new Map();
    const covered = new Set();
    const location = 'hello:10:20';
    const typeNames = ['+: -> ObjectExpression'];
    
    coverage.set(location, {
        covered,
        typeNames,
    });
    const [count] = report(coverage);
    
    t.equal(count, 1);
    t.end();
});

test('printer: type-checker: report: location', (t) => {
    const coverage = new Map();
    const covered = new Set();
    const location = 'hello:10:20';
    const typeNames = ['+: -> ObjectExpression'];
    
    coverage.set(location, {
        covered,
        typeNames,
    });
    const [, result] = report(coverage);
    
    const expected = montag`
        🧨 Uncovered Checkers found at index: 1
        1 | +: -> ObjectExpression
        hello:10:21:
    `;
    
    t.stripEqual(result, expected);
    t.end();
});

test('printer: type-checker: report: typeName: tuple', (t) => {
    const coverage = new Map();
    const covered = new Set();
    const location = 'hello:10:20';
    
    const typeNames = [
        ['+: -> !', isObjectExpression],
    ];
    
    coverage.set(location, {
        covered,
        typeNames,
    });
    const [, result] = report(coverage);
    
    const expected = montag`
        🧨 Uncovered Checkers found at index: 1
        1 | ['+: -> !', isObjectExpression]
        hello:10:21:
    `;
    
    t.stripEqual(result, expected);
    t.end();
});

test('printer: type-checker: report: typeName: tuple: no name', (t) => {
    const coverage = new Map();
    const covered = new Set();
    const location = 'hello:10:20';
    
    const typeNames = [
        ['+: -> !', isString()],
    ];
    
    coverage.set(location, {
        covered,
        typeNames,
    });
    const [, result] = report(coverage);
    
    const expected = montag`
        🧨 Uncovered Checkers found at index: 1
        1 | ['+: -> !', () => typeof a === 'string']
        hello:10:21:
    `;
    
    t.stripEqual(result, expected);
    t.end();
});

test('printer: type-checker: report: typeName: fn', (t) => {
    const coverage = new Map();
    const covered = new Set();
    const location = 'hello:10:20';
    const typeNames = [isObjectExpression];
    
    coverage.set(location, {
        covered,
        typeNames,
    });
    const [, result] = report(coverage);
    
    const expected = montag`
        🧨 Uncovered Checkers found at index: 1
        1 | isObjectExpression
        hello:10:21:
    `;
    
    t.stripEqual(result, expected);
    t.end();
});

test('printer: type-checker: report: typeName: tuple: string', (t) => {
    const coverage = new Map();
    const covered = new Set();
    const location = 'hello:10:20';
    const typeNames = [['+: -> isObjectExpression']];
    
    coverage.set(location, {
        covered,
        typeNames,
    });
    const [, result] = report(coverage);
    
    const expected = montag`
        🧨 Uncovered Checkers found at index: 1
        1 | +: -> isObjectExpression
        hello:10:21:
    `;
    
    t.stripEqual(result, expected);
    t.end();
});
