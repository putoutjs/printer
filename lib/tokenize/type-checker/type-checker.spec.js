import {createTest} from '#test';
import {isInsideTSModuleBlock} from '#is';
import {createTypeChecker} from './type-checker.js';

const {test} = createTest(import.meta.url);

test('printer: type-checker', (t) => {
    const isBlockLike = createTypeChecker(['Program', 'BlockStatement']);
    
    const is = isBlockLike({
        type: 'Program',
    });
    
    t.ok(is);
    t.end();
});

test('printer: type-checker: deepness: no parentPath', (t) => {
    const isBlockLike = createTypeChecker('path.parentPath', ['Program', 'BlockStatement']);
    
    const is = isBlockLike({
        type: 'Program',
    });
    
    t.notOk(is);
    t.end();
});

test('printer: type-checker: deepness: parentPath', (t) => {
    const isBlockLike = createTypeChecker('path.parentPath', ['Program', 'BlockStatement']);
    
    const parentPath = {
        type: 'Program',
    };
    
    const is = isBlockLike({
        parentPath,
    });
    
    t.ok(is);
    t.end();
});

test('printer: type-checker: predicate', (t) => {
    const isEmptyBody = ({node}) => !node.body.body.length;
    const isBlockLike = createTypeChecker('path.parentPath', [isEmptyBody]);
    
    const parentPath = {
        type: 'Program',
        node: {
            body: {
                body: [],
            },
        },
    };
    
    const is = isBlockLike({
        parentPath,
    });
    
    t.ok(is);
    t.end();
});

test('printer: type-checker: exclude', (t) => {
    const isEmptyBody = ({node}) => !node.body.body.length;
    const isBlockLike = createTypeChecker('path.parentPath', {
        include: ['Program'],
        exclude: [isEmptyBody],
    });
    
    const parentPath = {
        type: 'Program',
        node: {
            body: {
                body: [1],
            },
        },
    };
    
    const is = isBlockLike({
        parentPath,
    });
    
    t.ok(is);
    t.end();
});

test('printer: type-checker: tuples', (t) => {
    const hasEmptyFnBody = ({node}) => !node.body.body.length;
    
    const isInsideBlockLike = createTypeChecker([
        isInsideTSModuleBlock,
        ['-', 'BlockStatement'],
        hasEmptyFnBody,
    ]);
    
    const parentPath = {
        type: 'BlockStatement',
        node: {
            body: {
                body: [],
            },
        },
    };
    
    const is = isInsideBlockLike(parentPath);
    
    t.notOk(is);
    t.end();
});

test('printer: type-checker: tuples: boolean', (t) => {
    const hasEmptyFnBody = ({node}) => !node.body.body.length;
    
    const isInsideBlockLike = createTypeChecker([
        isInsideTSModuleBlock,
        [false, 'BlockStatement'],
        hasEmptyFnBody,
    ]);
    
    const parentPath = {
        type: 'BlockStatement',
        node: {
            body: {
                body: [],
            },
        },
    };
    
    const is = isInsideBlockLike(parentPath);
    
    t.notOk(is);
    t.end();
});
