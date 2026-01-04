import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {createTest} from '#test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: ts-module-declaration-export', (t) => {
    t.print(fixture.tsModuleDeclarationExport);
    t.end();
});

test('printer: tokenizer: typescript: ts-module-declaration-couple', (t) => {
    t.print(fixture.tsModuleDeclarationCouple);
    t.end();
});

test('printer: tokenizer: typescript: namespace: declare', (t) => {
    t.print(fixture.tsNamespaceDeclare);
    t.end();
});

test('printer: tokenizer: typescript: ts-module-declaration-interface', (t) => {
    t.print(fixture.tsModuleDeclarationInterface);
    t.end();
});

test('printer: tokenizer: typescript: namespace: type', (t) => {
    t.print(fixture.tsNamespaceType);
    t.end();
});

test('printer: tokenizer: typescript: ts-module-declaration: export-named-declaration', (t) => {
    t.print(fixture.tsModuleDeclarationExportNamed);
    t.end();
});

test('printer: tokenizer: typescript: ts-module-declaration: global', (t) => {
    t.print(fixture.tsModuleDeclarationGlobal);
    t.end();
});
