'use strict';

const rendy = require('rendy');
const maybeSatisfy = require('./satisfy');
const {types} = require('@putout/babel');
const {
    isProgram,
    isFile,
    File,
    ExpressionStatement,
    Program,
    isStatement,
} = types;
const isFn = (a) => typeof a === 'function';

module.exports.maybeThrow = (a, path, b) => {
    if (!a)
        return;
    
    throw Error(rendy(b, {
        path,
        type: path.type,
    }));
};

const maybeStatement = (ast) => isStatement(ast) ? ast : ExpressionStatement(ast);

const maybeProgram = (ast) => isProgram(ast) ? ast : Program([
    maybeStatement(ast),
]);

module.exports.maybeFile = (ast) => isFile(ast) ? ast : File(maybeProgram(ast));

module.exports.maybeVisitor = (plugin, path, printer, options) => {
    if (isFn(plugin))
        return plugin(path, printer, options);
    
    return objectPlugin(plugin, path, printer, options);
};

function objectPlugin(plugin, path, printer, options) {
    const {
        print,
        split,
        condition,
        before = split,
        beforeIf = condition,
        after = split,
        afterIf = condition,
    } = maybeSatisfy(plugin);
    
    if (beforeIf?.(path, printer))
        before(path, printer);
    
    print(path, printer, options);
    
    if (afterIf?.(path, printer))
        after(path, printer);
}
