import {createTypeChecker} from '#type-checker';
import {instrument, getCoverage} from '#type-checker/instrument';
import {report} from '#type-checker/report';
import {whenTestsEnds} from '#type-checker/when-tests-ends';

const isProgramWithBlockStatement = createTypeChecker(['Program', 'BlockStatement']);
isProgramWithBlockStatement({
    type: 'Program',
});

const isEmptyBody = (_a: {
    node: {
        body: {
            body: unknown[];
        };
    };
}) => !_a.node.body.body.length;

const isEmptyBodyChecker = createTypeChecker([isEmptyBody]);

isEmptyBodyChecker({
    node: {
        body: {
            body: [],
        },
    },
});

const isNotBlockStatement = createTypeChecker([
    ['-', 'BlockStatement'],
]);

isNotBlockStatement({
    type: 'Program',
});

const isParentExportDefaultDeclaration = createTypeChecker([
    '+: parentPath -> ExportDefaultDeclaration',
]);

isParentExportDefaultDeclaration({
    parentPath: {
        type: 'ExportDefaultDeclaration',
    },
});

const isNotCallExpression = createTypeChecker([
    '+: parentPath -> !CallExpression',
]);

isNotCallExpression({});

const hasFnBody = (_a: {
    node: {
        body: {
            body: unknown[];
        };
    };
}) => _a.node.body.body.length;

const isFnBodyNotExportDefault = createTypeChecker([
    ['-: parentPath -> !', 'ExportDefaultDeclaration'],
    ['+', hasFnBody],
]);

isFnBodyNotExportDefault({
    parentPath: {
        type: 'ExportDefaultDeclaration',
    },
    type: 'BlockStatement',
    node: {
        body: {
            body: [],
        },
    },
});

createTypeChecker([
    '+: -> BlockStatement',
], {
    instrumentName: 'hello',
});

const hasFnBodyOptions = (_a: unknown, b: Record<string, unknown>) => b.is;

const checksFnBodyOptions = createTypeChecker([
    ['+', hasFnBodyOptions],
]);

checksFnBodyOptions({
    type: 'FunctionDeclaration',
}, {
    is: true,
});

const typeCheckStringLiteral = instrument(['+: -> StringLiteral'], (_a: unknown) => Boolean(_a), {
    instrumentName: 'TYPE_CHECK',
});

typeCheckStringLiteral({});

report(getCoverage());
whenTestsEnds();
