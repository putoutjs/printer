'use strict';

const {
    hasTrailingComment,
    isLast,
} = require('../is');

const {markBefore} = require('../mark');
const {isVariableDeclarator} = require('@babel/types');

module.exports.parseLeadingComments = (path, {print, maybe, indent}, semantics) => {
    if (!semantics.comments)
        return;
    
    const {leadingComments} = path.node;
    
    if (!leadingComments?.length)
        return;
    
    if (hasTrailingComment(path.getPrevSibling()))
        return;
    
    const insideFn = path.parentPath.isFunction();
    const isProperty = path.isObjectProperty() || isVariableDeclarator(path);
    const isIndent = !path.isClassMethod() && !insideFn && !isProperty;
    
    for (const {type, value} of leadingComments) {
        maybe.indent(isIndent);
        
        if (type === 'CommentLine') {
            maybeInsideFn(insideFn, {
                print,
                indent,
            });
            
            maybe.print.space(isProperty);
            print(`//${value}`);
            
            maybe.print.breakline(isProperty);
            maybe.print.newline(!isProperty);
            continue;
        }
        
        if (type === 'CommentBlock') {
            print(`/*${value}*/`);
            
            if (path.isStatement() || path.isClassMethod()) {
                print.newline();
                markBefore(path);
                maybe.indent(path.isClassMethod());
            }
            
            continue;
        }
    }
};

module.exports.parseTrailingComments = (path, {write, maybe}, semantics) => {
    if (!semantics.comments)
        return;
    
    const {trailingComments} = path.node;
    
    if (!trailingComments?.length)
        return;
    
    for (const {type, value, loc} of trailingComments) {
        const sameLine = isSameLine(path, loc);
        
        if (type === 'CommentLine') {
            maybe.write.space(sameLine);
            maybe.indent(!sameLine);
            
            write(`//${value}`);
            maybe.write.newline(!isLast(path));
            continue;
        }
        
        if (type === 'CommentBlock') {
            maybe.write.space(sameLine);
            write(`/*${value}*/`);
            maybe.write.newline(!sameLine);
        }
    }
};

module.exports.parseComments = (path, {write}, semantics) => {
    if (!semantics.comments)
        return;
    
    const comments = path.node.comments || path.node.innerComments;
    
    if (!comments)
        return;
    
    for (const {type, value} of comments) {
        if (type === 'CommentLine') {
            write.breakline();
            write('//');
            write(value);
            write.newline();
            continue;
        }
        
        if (type === 'CommentBlock') {
            write('/*');
            write(value);
            write('*/');
        }
    }
};

function isSameLine(path, loc) {
    return path.node.loc?.start.line === loc.start.line || path.node.loc?.end.line === loc.end.line;
}

function maybeInsideFn(insideFn, {print, indent}) {
    if (!insideFn)
        return;
    
    indent.inc();
    indent.inc();
    print.breakline();
    indent.dec();
    indent.dec();
}
