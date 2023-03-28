'use strict';

const isFn = (a) => typeof a === 'function';

const {
    isProgram,
    isFile,
    File,
    ExpressionStatement,
    Program,
} = require('@babel/types');

const maybeProgram = (ast) => isProgram(ast) ? ast : Program([
    ExpressionStatement(ast),
]);

module.exports.maybeFile = (ast) => isFile(ast) ? ast : File(maybeProgram(ast));

module.exports.maybePlugin = (plugin, path, printer) => {
    if (isFn(plugin))
        return plugin(path, printer);
    
    return objectPlugin(plugin, path, printer);
};

function objectPlugin(plugin, path, printer) {
    const {
        print,
        split,
        before = split,
        beforeIf,
        after = split,
        afterIf,
    } = plugin;
    
    if (beforeIf?.(path, printer)) {
        before(path, printer);
    }
    
    print(path, printer);
    
    if (afterIf?.(path, printer)) {
        after(path, printer);
    }
}
