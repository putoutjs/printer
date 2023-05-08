insertAfter(parentPath, [
    ExportNamedDeclaration(declarator, specifiers),
]);

const [code, places] = lint('debugger', {
    fix: true, // default
    plugins: [
        ['remove-debugger', createPlugin(removeDebugger)],
    ],
});