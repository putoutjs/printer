'use strict';

const {isNext} = require('./is');

const {markBefore} = require('./mark');

module.exports.parseLeadingComments = (path, {print, maybe}) => {
    const {leadingComments} = path.node;
    
    if (!leadingComments || !leadingComments.length)
        return;
    
    const insideFn = path.parentPath.isFunction();
    const isIndent = !path.isClassMethod() && !insideFn;
    
    for (const {type, value} of leadingComments) {
        maybe.indent(isIndent);
        
        if (type === 'CommentLine') {
            maybe.indent.inc(insideFn);
            maybe.indent.inc(insideFn);
            maybe.print.breakline(insideFn);
            maybe.indent.dec(insideFn);
            maybe.indent.dec(insideFn);
            
            print(`//${value}`);
            print.newline();
            
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

module.exports.parseTrailingComments = (path, {write, maybe}) => {
    const {trailingComments} = path.node;
    
    if (!trailingComments || !trailingComments.length)
        return;
    
    if (isNext(path))
        return;
    
    for (const {type, value, loc} of trailingComments) {
        if (type === 'CommentLine') {
            const sameLine = isSameLine(path, loc);
            
            maybe.write.space(sameLine);
            maybe.indent(!sameLine);
            write(`//${value}`);
            write.newline();
        }
    }
};

function isSameLine(path, loc) {
    return path.node.loc.start.line === loc.start.line;
}
