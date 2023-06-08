const a = 5;

await runProcessors({
    processorRunners, // optional
    load, // when you need to override 'import()'
});
