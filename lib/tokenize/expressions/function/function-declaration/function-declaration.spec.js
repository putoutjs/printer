import {parse} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: functions: declaration: space', (t) => {
    const ast = parse(fixture.functionDeclaration, {
        printer: 'putout',
    });
    
    const result = print(ast, {
        format: {
            space: '',
            newline: '',
            indent: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.functionDeclarationFix);
    t.end();
});

test('printer: tokenizer: functions: declaration: generator', (t) => {
    t.print(fixture.functionDeclarationGenerator);
    t.end();
});

test('printer: tokenizer: functions: declaration: nested', (t) => {
    t.print(fixture.functionDeclarationNested);
    t.end();
});

test('printer: tokenizer: functions: declaration: indent before assign', (t) => {
    t.print(fixture.functionDeclarationIndentBeforeAssign);
    t.end();
});

test('printer: tokenizer: functions: declaration: indent before function', (t) => {
    t.print(fixture.functionDeclarationIndentBeforeFunction);
    t.end();
});

test('printer: tokenizer: functions: declaration: newline', (t) => {
    t.print(fixture.functionDeclarationNewline);
    t.end();
});

test('printer: tokenizer: functions: declaration: params: comment: line: same', (t) => {
    t.print(fixture.paramsCommentLineSame);
    t.end();
});

test('printer: tokenizer: functions: declaration: params: comment: line: last', (t) => {
    t.print(fixture.paramsCommentLineLast);
    t.end();
});

test('printer: tokenizer: functions: declaration: params: comment: line: own', (t) => {
    t.print(fixture.paramsCommentLineOwn);
    t.end();
});

test('printer: tokenizer: functions: declaration: params: comment: line: both', (t) => {
    t.print(fixture.paramsCommentLineBoth);
    t.end();
});

test('printer: tokenizer: functions: declaration: params: comment: block', (t) => {
    t.print(fixture.paramsCommentBlock);
    t.end();
});

test('printer: tokenizer: functions: declaration: params: comment: rest', (t) => {
    t.print(fixture.paramsCommentRest);
    t.end();
});

test('printer: tokenizer: functions: declaration: params: comment: block: multiline', (t) => {
    t.print(fixture.paramsCommentBlockMultiline);
    t.end();
});

test('printer: tokenizer: functions: declaration: params: comment: line: same: no loc', (t) => {
    const ast = parse(fixture.paramsCommentLineSame);
    const [{params}] = ast.program.body;
    
    for (const param of params)
        delete param.loc;
    
    const result = print(ast);
    
    t.equal(result, `${fixture.paramsCommentLineSameNoLoc}\n`);
    t.end();
});

test('printer: tokenizer: functions: declaration: params: comment: line: end', (t) => {
    t.print(fixture.paramsCommentLineEnd);
    t.end();
});

test('printer: tokenizer: functions: declaration: params: comment: empty', (t) => {
    t.print(fixture.paramsCommentEmpty);
    t.end();
});

test('printer: tokenizer: functions: declaration: params: comment: empty: nested', (t) => {
    t.print(fixture.paramsCommentEmptyNested);
    t.end();
});

test('printer: tokenizer: functions: declaration: params: comment: block: end', (t) => {
    t.print(fixture.paramsCommentBlockEnd);
    t.end();
});

test('printer: tokenizer: functions: declaration: params: comment: block: end: rest', (t) => {
    t.print(fixture.paramsCommentBlockEndRest);
    t.end();
});
