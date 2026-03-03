import {types} from '@putout/babel';
import {createTest} from '#test';
import {isInsideTSModuleBlock} from '#is';
import {createTypeChecker} from './type-checker.js';

const {isExportDefaultDeclaration} = types;

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

test('printer: type-checker: tuples: -', (t) => {
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

test('printer: type-checker: tuples: dsl', (t) => {
    const hasEmptyFnBody = ({node}) => !node.body.body.length;
    const isInsideExportDefaultWithBody = createTypeChecker([
        ['-: parentPath -> !', isExportDefaultDeclaration],
        ['+', hasEmptyFnBody],
    ]);
    
    const path = {
        parentPath: {
            type: 'ExportDefaultDeclaration',
        },
        type: 'BlockStatement',
        node: {
            body: {
                body: [1],
            },
        },
    };
    
    const is = isInsideExportDefaultWithBody(path);
    
    t.notOk(is);
    t.end();
});

test('printer: type-checker: tuples: dsl: no', (t) => {
    const isInsideExportDefaultWithBody = createTypeChecker([
        ['+: parentPath -> !', isExportDefaultDeclaration],
    ]);
    
    const path = {
        parentPath: {
            type: 'ExportDefaultDeclaration',
        },
        type: 'BlockStatement',
        node: {
            body: {
                body: [1],
            },
        },
    };
    
    const is = isInsideExportDefaultWithBody(path);
    
    t.notOk(is);
    t.end();
});

test('printer: type-checker: tuples: dsl: is: no selector', (t) => {
    const hasFnBody = ({node}) => node.body.body.length;
    const isInsideExportDefaultWithBody = createTypeChecker([
        ['+: -> !', hasFnBody],
    ]);
    
    const path = {
        type: 'FunctionDeclaration',
        node: {
            body: {
                body: [1],
            },
        },
    };
    
    const is = isInsideExportDefaultWithBody(path);
    
    t.notOk(is);
    t.end();
});

test('printer: type-checker: tuples: dsl: type: is', (t) => {
    const isInsideExportDefaultWithBody = createTypeChecker([
        ['+: parentPath -> !', 'ExportDefaultDeclaration'],
    ]);
    
    const path = {
        parentPath: {
            type: 'ExportDefaultDeclaration',
        },
        type: 'BlockStatement',
        node: {
            body: {
                body: [1],
            },
        },
    };
    
    const is = isInsideExportDefaultWithBody(path);
    
    t.notOk(is);
    t.end();
});

test('printer: type-checker: tuples: dsl: expression: not', (t) => {
    const isInsideExportDefaultWithBody = createTypeChecker([
        '+: parentPath -> !BlockStatement',
    ]);
    
    const path = {
        parentPath: {
            type: 'ExportDefaultDeclaration',
        },
    };
    
    const is = isInsideExportDefaultWithBody(path);
    
    t.ok(is);
    t.end();
});

test('printer: type-checker: tuples: dsl: expression', (t) => {
    const isInsideExportDefaultWithBody = createTypeChecker([
        '+: parentPath -> ExportDefaultDeclaration',
    ]);
    
    const path = {
        parentPath: {
            type: 'ExportDefaultDeclaration',
        },
    };
    
    const is = isInsideExportDefaultWithBody(path);
    
    t.ok(is);
    t.end();
});
