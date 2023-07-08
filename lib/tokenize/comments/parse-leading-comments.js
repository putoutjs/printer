'use strict';

const {hasTrailingComment} = require('../is');
const {isVariableDeclarator} = require('@babel/types');
const {markBefore} = require('../mark');
const {maybeInsideFn} = require('./maybe-inside-fn');

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
            const looksLikeMethod = path.isClassMethod();
            const looksLikeDirective = path.isDirective();
            const looksLikeProp = path.isObjectProperty();
            
            if (looksLikeProp)
                print.breakline();
            
            print(`/*${value}*/`);
            
            if (path.isStatement() || looksLikeDirective || looksLikeMethod || looksLikeProp) {
                print.newline();
                markBefore(path);
                maybe.indent(looksLikeMethod || looksLikeProp);
            }
            
            continue;
        }
    }
};
