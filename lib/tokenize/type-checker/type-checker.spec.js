import {types} from '@putout/babel';
import {stub} from 'supertape';
import {createTest} from '#test';
import {createTypeChecker} from '#type-checker';
import {
    callWithParent,
    isInsideTSModuleBlock,
} from '#is';

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
    const isBlockLike = callWithParent(createTypeChecker(['Program', 'BlockStatement']));
    
    const is = isBlockLike({
        type: 'Program',
    });
    
    t.notOk(is);
    t.end();
});

test('printer: type-checker: deepness: parentPath', (t) => {
    const isBlockLike = callWithParent(createTypeChecker(['Program', 'BlockStatement']));
    
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
    const isBlockLike = callWithParent(createTypeChecker([isEmptyBody]));
    
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
    const isBlockLike = callWithParent(createTypeChecker({
        include: ['Program'],
        exclude: [isEmptyBody],
    }));
    
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

test('printer: type-checker: tuples: options', (t) => {
    const hasFnBody = (path, {is}) => is;
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
    
    const is = isInsideExportDefaultWithBody(path, {
        is: true,
    });
    
    t.ok(is);
    t.end();
});

test('printer: type-checker: tuples: dsl: too long path', (t) => {
    const hasEmptyFnBody = ({node}) => !node.body.body.length;
    const isInsideExportDefaultWithBody = createTypeChecker([
        ['-: parentPath.parentPath.parentPath -> !', isExportDefaultDeclaration],
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

test('printer: type-checker: tuples: dsl: ends with ->', (t) => {
    const beforeIf = createTypeChecker([
        ['+: parentPath ->', isExportDefaultDeclaration],
    ]);
    
    const path = {
        parentPath: {
            type: 'ExportDefaultDeclaration',
        },
    };
    
    const is = beforeIf(path);
    
    t.ok(is);
    t.end();
});

test('printer: type-checker: tuples: dsl: inside array', (t) => {
    const isInside = createTypeChecker([
        ['+: -> BlockStatement'],
    ]);
    
    const path = {
        type: 'BlockStatement',
    };
    
    const is = isInside(path);
    
    t.ok(is);
    t.end();
});

test('printer: type-checker: disable instrument', (t) => {
    const instrumentCoverage = stub();
    const overrides = {
        instrumentCoverage,
        instrument: false,
    };
    
    createTypeChecker([
        ['+: -> BlockStatement'],
    ], overrides);
    
    const {args} = instrumentCoverage;
    const [, , third] = args[0];
    
    t.deepEqual(third, overrides);
    t.end();
});
