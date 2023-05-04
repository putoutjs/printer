'use strict';

const {hasTrailingComment} = require('./is');

const {markBefore} = require('./mark');

module.exports.parseLeadingComments = (path, {print, maybe, indent}, format) => {
    if (!format.comments)
        return;
    
    const {leadingComments} = path.node;
    
    if (!leadingComments?.length)
        return;
    
    if (hasTrailingComment(path.getPrevSibling()))
        return;
    
    const insideFn = path.parentPath.isFunction();
    const isProperty = path.isObjectProperty();
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

module.exports.parseTrailingComments = (path, {write, maybe}, format) => {
    if (!format.comments)
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
            write.newline();
            continue;
        }
        
        if (type === 'CommentBlock') {
            maybe.write.space(sameLine);
            write(`/*${value}*/`);
            maybe.write.newline(!sameLine);
        }
    }
};

function isSameLine(path, loc) {
    return path.node.loc.start.line === loc.start.line;
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
