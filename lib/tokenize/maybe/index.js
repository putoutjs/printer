'use strict';

const rendy = require('rendy');
const maybeSatisfy = require('./satisfy');

const {
    isProgram,
    isFile,
    File,
    ExpressionStatement,
    Program,
} = require('@babel/types');

const isFn = (a) => typeof a === 'function';

module.exports.maybeThrow = (a, path, b) => {
    if (!a)
        return;
    
    throw Error(rendy(b, {
        path,
        type: path.type,
    }));
};

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
        condition,
        before = split,
        beforeIf = condition,
        after = split,
        afterIf = condition,
    } = maybeSatisfy(plugin);
    
    if (beforeIf?.(path, printer)) {
        before(path, printer);
    }
    
    print(path, printer);
    
    if (afterIf?.(path, printer)) {
        after(path, printer);
    }
}
