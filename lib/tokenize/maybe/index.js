'use strict';

const rendy = require('rendy');

const {types} = require('@putout/babel');
const maybeSatisfy = require('./satisfy');

const {
    isProgram,
    isFile,
    isStatement,
    expressionStatement,
    program,
    file,
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

const maybeStatement = (ast) => isStatement(ast) ? ast : expressionStatement(ast);

const maybeProgram = (ast) => isProgram(ast) ? ast : program([
    maybeStatement(ast),
]);

module.exports.maybeFile = (ast) => isFile(ast) ? ast : file(maybeProgram(ast));

module.exports.maybeVisitor = (plugin, path, printer, options) => {
    if (isFn(plugin))
        return plugin(path, printer, options);
    
    return objectPlugin(plugin, path, printer, options);
};

function objectPlugin(plugin, path, printer, semantics) {
    const {
        print,
        split,
        condition,
        before = split,
        beforeIf = condition,
        after = split,
        afterIf = condition,
    } = maybeSatisfy(plugin);
    
    if (beforeIf?.(path, printer, semantics))
        before(path, printer, semantics);
    
    print(path, printer, semantics);
    
    if (afterIf?.(path, printer, semantics))
        after(path, printer, semantics);
}
