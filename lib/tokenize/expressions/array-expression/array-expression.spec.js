import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {parse, transform} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: array-expression', (t) => {
    t.print(fixture.arrayExpression);
    t.end();
});

test('printer: tokenizer: array-expression: newline', (t) => {
    t.print(fixture.arrayExpressionNewline);
    t.end();
});

test('printer: tokenizer: array-expression: tuple-member', (t) => {
    t.print(fixture.arrayExpressionTupleMember);
    t.end();
});

test('printer: tokenizer: array-expression: tuple-call', (t) => {
    t.print(fixture.arrayExpressionTupleCall);
    t.end();
});

test('printer: tokenizer: array-expression: tuple: boolean, identifier', (t) => {
    t.print(fixture.arrayExpressionTupleBooleanIdentifier);
    t.end();
});

test('printer: tokenizer: array-expression: tuple-object', (t) => {
    t.print(fixture.arrayExpressionTupleObject);
    t.end();
});

test('printer: tokenizer: array-expression: tuple-null', (t) => {
    t.print(fixture.arrayExpressionTupleNull);
    t.end();
});

test('printer: tokenizer: array-expression: tuple: identifier, string', (t) => {
    t.print(fixture.arrayExpressionTupleIdentifierString);
    t.end();
});

test('printer: tokenizer: array-expression: tuple: string, other', (t) => {
    t.print(fixture.arrayExpressionTupleStringMember);
    t.end();
});

test('printer: tokenizer: array-expression: object', (t) => {
    t.print(fixture.arrayExpressionObject);
    t.end();
});

test('printer: tokenizer: array-expression: plugins', (t) => {
    t.print(fixture.arrayExpressionPlugins);
    t.end();
});

test('printer: tokenizer: array-expression: plugins: couple lines', (t) => {
    const source = fixture.arrayExpressionPluginsCoupleLines;
    const ast = parse(source);
    const result = print(ast);
    const expected = fixture.arrayExpressionPluginsCoupleLinesFix;
    
    t.equal(result, expected);
    t.end();
});

test('printer: tokenizer: array-expression: tuple: string, string', (t) => {
    t.print(fixture.arrayExpressionTupleStringString);
    t.end();
});

test('printer: tokenizer: array-expression: argument', (t) => {
    t.print(fixture.arrayExpressionArgument);
    t.end();
});

test('printer: tokenizer: array-expression: call', (t) => {
    t.print(fixture.arrayExpressionCall);
    t.end();
});

test('printer: tokenizer: statement: ArrayExpression: space', (t) => {
    const ast = parse(fixture.arrayExpressionSpace);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.arrayExpressionSpaceFix);
    t.end();
});

test('printer: tokenizer: statement: ArrayExpression: maxElementsInOneLine', (t) => {
    const ast = parse(fixture.arrayExpressionMaxElementsInOneLine);
    
    const result = print(ast, {
        semantics: {
            maxElementsInOneLine: 1,
        },
    });
    
    t.equal(result, fixture.arrayExpressionMaxElementsInOneLineFix);
    t.end();
});

test('printer: tokenizer: statement: ArrayExpression: maxElementsInOneLine: zero', (t) => {
    const ast = parse(fixture.arrayExpressionMaxElementsInOneLineZero);
    
    const result = print(ast, {
        semantics: {
            maxElementsInOneLine: 0,
        },
    });
    
    t.equal(result, fixture.arrayExpressionMaxElementsInOneLineZeroFix);
    t.end();
});

test('printer: tokenizer: statement: ArrayExpression: one simple', (t) => {
    t.print(fixture.arrayExpressionOneSimple);
    t.end();
});

test('printer: tokenizer: statement: ArrayExpression: spread', (t) => {
    t.print(fixture.arrayExpressionSpread);
    t.end();
});

test('printer: tokenizer: statement: ArrayExpression: spread: object', (t) => {
    t.print(fixture.arrayExpressionSpreadObject);
    t.end();
});

test('printer: tokenizer: statement: ArrayExpression: tuple: one', (t) => {
    t.print(fixture.arrayExpressionTupleOne);
    t.end();
});

test('printer: tokenizer: statement: ArrayExpression: object: tuple', (t) => {
    t.print(fixture.arrayExpressionObjectTuple);
    t.end();
});

test('printer: tokenizer: statement: ArrayExpression: ObjectExpression inside', (t) => {
    t.print(fixture.objectExpressionInsideArrayExpression);
    t.end();
});

test('printer: tokenizer: statement: ArrayExpression: no-trailing-comma', (t) => {
    t.print(fixture.arrayExpressionNoTrailingComma, {
        semantics: {
            trailingComma: false,
        },
    });
    t.end();
});

test('printer: tokenizer: array-call-four', (t) => {
    t.print(fixture.arrayCallFour);
    t.end();
});

test('printer: tokenizer: array-tuple-inside-array', (t) => {
    t.print(fixture.arrayTupleInsideArray);
    t.end();
});

test('printer: tokenizer: array-objects', (t) => {
    t.print(fixture.arrayObjects);
    t.end();
});

test('printer: tokenizer: array-spreads', (t) => {
    t.print(fixture.arraySpreads);
    t.end();
});

test('printer: tokenizer: array-object-identifier', (t) => {
    t.print(fixture.arrayObjectIdentifier);
    t.end();
});

test('printer: tokenizer: array-call-object', (t) => {
    t.print(fixture.arrayCallObject);
    t.end();
});

test('printer: tokenizer: array-tuple', (t) => {
    t.print(fixture.arrayTuple);
    t.end();
});

test('printer: tokenizer: array-sibling', (t) => {
    t.print(fixture.arraySibling);
    t.end();
});

test('printer: tokenizer: array-expression: nested', (t) => {
    t.print(fixture.arrayExpressionNested);
    t.end();
});

test('printer: tokenizer: array-expression: identifier, object', (t) => {
    t.print(fixture.arrayIdentifierObject);
    t.end();
});

test('printer: tokenizer: array-expression: spread, object', (t) => {
    t.print(fixture.arraySpreadObject);
    t.end();
});

test('printer: tokenizer: array-expression: nested: space', (t) => {
    t.print(fixture.arrayNestedSpace);
    t.end();
});

test('printer: tokenizer: array-expression: nested: object', (t) => {
    t.print(fixture.arrayNestedObject);
    t.end();
});

test('printer: tokenizer: array-expression: tuple: string inside call', (t) => {
    t.print(fixture.arrayTupleStringInsideCall);
    t.end();
});

test('printer: tokenizer: array-expression: tuple: call', (t) => {
    t.print(fixture.arrayTupleCall);
    t.end();
});

test('printer: tokenizer: array-expression: comma', (t) => {
    t.print(fixture.arrayExpressionComma);
    t.end();
});

test('printer: tokenizer: array-expression: indent', (t) => {
    const source = fixture.arrayExpressionIndent;
    const ast = parse(source);
    
    transform(ast, source, {
        rules: {
            'nodejs/convert-esm-to-commonjs': 'on',
        },
        plugins: [
            'nodejs',
            'putout',
            'apply-shorthand-properties',
        ],
    });
    
    const result = print(ast);
    const expected = fixture.arrayExpressionIndentFix;
    
    t.equal(result, expected);
    t.end();
});

test('printer: tokenizer: array-expression: return', (t) => {
    t.print(fixture.arrayExpressionReturn);
    t.end();
});

test('printer: tokenizer: array: middle-object', (t) => {
    t.print(fixture.arrayMiddleObject);
    t.end();
});

test('printer: tokenizer: array: nested-triple', (t) => {
    t.print(fixture.arrayNestedTriple);
    t.end();
});

test('printer: tokenizer: array: tuple: function', (t) => {
    t.print(fixture.arrayTupleFunction);
    t.end();
});

test('printer: tokenizer: statement: ArrayExpression: long-identifier', (t) => {
    const ast = parse(fixture.arrayLongIdentifier);
    
    const result = print(ast, {
        semantics: {
            maxElementLengthInOneLine: 100,
        },
    });
    
    t.equal(result, fixture.arrayLongIdentifier);
    t.end();
});
