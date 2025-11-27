'use strict';

const {createTest} = require('#test');
const {traverse} = require('@putout/babel');

const {parse, transform} = require('putout');

const {print} = require('../../../printer');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: object-pattern', (t) => {
    const source = fixture.objectPattern;
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: ['extract-object-properties'],
    });
    
    const result = print(ast);
    const expected = fixture.objectPatternFix;
    
    t.equal(result, expected);
    t.end();
});

test('printer: tokenizer: object-pattern: transform', (t) => {
    const source = fixture.objectPatternTransform;
    const ast = parse(source);
    const printer = require('@putout/plugin-printer');
    
    transform(ast, source, {
        plugins: [
            ['printer', printer],
        ],
    });
    
    const result = print(ast);
    const expected = fixture.objectPatternTransformFix;
    
    t.equal(result, expected);
    t.end();
});

test('printer: tokenizer: object-pattern: nested', (t) => {
    t.print(fixture.objectPatternNested);
    t.end();
});

test('printer: tokenizer: object-pattern: nested: assign', (t) => {
    t.print(fixture.objectPatternNestedAssign);
    t.end();
});

test('printer: tokenizer: object-pattern: assign: object', (t) => {
    t.print(fixture.objectPatternAssignObject);
    t.end();
});

test('printer: tokenizer: object-pattern: one: nested', (t) => {
    t.print(fixture.objectPatternOneNested);
    t.end();
});

test('printer: tokenizer: object-pattern: for-of', (t) => {
    t.print(fixture.objectPatternForOf);
    t.end();
});

test('printer: tokenizer: object-pattern: string', (t) => {
    t.print(fixture.objectPatternString);
    t.end();
});

test('printer: tokenizer: object-pattern: arg', (t) => {
    t.print(fixture.objectPatternArg);
    t.end();
});

test('printer: tokenizer: object-pattern: computed', (t) => {
    t.print(fixture.objectPatternComputed);
    t.end();
});

test('printer: tokenizer: object-pattern: comment', (t) => {
    t.print(fixture.objectPatternComment);
    t.end();
});

test('printer: tokenizer: object-pattern: rest', (t) => {
    t.print(fixture.objectPatternRest);
    t.end();
});

test('printer: tokenizer: object-pattern: max properties in one line', (t) => {
    t.print(fixture.objectPatternMaxPropertiesInOneLine, {
        maxPropertiesInOneLine: 1,
    });
    t.end();
});

test('printer: tokenizer: object-pattern: wrong-shorthand', (t) => {
    const ast = parse(fixture.objectPatternWrongShorthand);
    
    traverse(ast, {
        Statement(path) {
            path.scope.rename('a', 'zzz');
        },
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.objectPatternWrongShorthandFix);
    t.end();
});

test('printer: tokenizer: object-pattern: space', (t) => {
    const ast = parse(fixture.objectPatternSpace);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.objectPatternSpaceFix);
    t.end();
});

test('printer: tokenizer: object-pattern: transform: newline', (t) => {
    const source = fixture.objectPatternTransformNewline;
    const ast = parse(source);
    
    const result = print(ast);
    
    t.equal(result, fixture.objectPatternTransformNewlineFix);
    t.end();
});

test('printer: tokenizer: object-pattern: assign', (t) => {
    t.print(fixture.objectPatternAssign);
    t.end();
});

test('printer: tokenizer: object-pattern: assign: long', (t) => {
    t.print(fixture.objectPatternAssignLong);
    t.end();
});

test('printer: tokenizer: object-pattern: as: expression', (t) => {
    t.print(fixture.objectPatternAsExpression);
    t.end();
});

test('printer: tokenizer: object-pattern: inside identifier object tuple', (t) => {
    t.print(fixture.objectInsideIdentifierObjectTuple);
    t.end();
});

test('printer: tokenizer: object-pattern: long properties', (t) => {
    t.print(fixture.objectPatternLongProperties);
    t.end();
});

test('printer: tokenizer: object-pattern: as function param', (t) => {
    t.print(fixture.objectPatternAsFunctionParam);
    t.end();
});

test('printer: tokenizer: object-pattern: nested: short', (t) => {
    t.print(fixture.objectPatternNestedShort);
    t.end();
});

test('printer: tokenizer: object-pattern: long: numeric', (t) => {
    t.print(fixture.objectPatternLongNumeric);
    t.end();
});

test('printer: tokenizer: object-pattern: inside var', (t) => {
    t.print(fixture.objectInsideVar);
    t.end();
});

test('printer: tokenizer: object-pattern: long', (t) => {
    t.print(fixture.objectPatternLong);
    t.end();
});

test('printer: tokenizer: object-pattern: long properties: override', (t) => {
    const ast = parse(fixture.objectPatternLongProperties);
    const result = print(ast, {
        semantics: {
            maxPropertiesLengthInOneLine: 30,
        },
    });
    
    t.equal(result, fixture.objectPatternLongPropertiesOverrideFix);
    t.end();
});
