export {WithStatement} from './with-statement/with-statement.js';
export {EmptyStatement} from './empty-statement/empty-statement.js';
export {LabeledStatement} from './labeled-statement/labeled-statement.js';
export {ContinueStatement} from './continue-statement/continue-statement.js';
export {Program} from './program/program.js';
export {DoWhileStatement} from './do-while-statement/do-while-statement.js';
export {BreakStatement} from './break-statement/break-statement.js';
export {ExportDefaultDeclaration} from './export-declaration/export-default-declaration.js';
export {ForInStatement} from './for-in-statement.js';
export {SwitchStatement} from './switch-statement/switch-statement.js';
export {WhileStatement} from './while-statement/while-statement.js';
export {ExportAllDeclaration} from './export-declaration/export-all-declaration.js';
export * from './export-declaration/export-declaration.js';
export * from './import-declaration/import-declaration.js';
export {ForStatement} from './for-statement.js';
export {DebuggerStatement} from './debugger-statement.js';
export * from './try-statement/try-statements.js';
export {ReturnStatement} from './return-statement/return-statement.js';
export {BlockStatement} from './block-statement/block-statement.js';
export {ForOfStatement} from './for-of-statement/for-of-statement.js';
export {IfStatement} from './if-statement/if-statement.js';
export {VariableDeclaration} from './variable-declaration/variable-declaration.js';
export {ExpressionStatement} from './expression-statement/expression-statement.js';

const SHEBANG_HASHBANG = '#!';

export const InterpreterDirective = (path, {print}) => {
    print(`${SHEBANG_HASHBANG}${path.node.value}\n`);
    print.newline();
};

