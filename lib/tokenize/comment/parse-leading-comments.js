'use strict';

const {hasTrailingComment} = require('../is');

const {markBefore} = require('../mark');
const {maybeInsideFn} = require('./maybe-inside-fn');

module.exports.parseLeadingComments = (path, {print, maybe, indent}, semantics) => {
    if (!semantics.comments)
        return;
    
    const {leadingComments} = path.node;
    
    if (!leadingComments?.length)
        return;
    
    const looksLikeSwitchCase = path.isSwitchCase();
    
    if (!looksLikeSwitchCase && hasTrailingComment(path.getPrevSibling()))
        return;
    
    const insideFn = path.parentPath.isFunction();
    const isProperty = path.isObjectProperty() || path.isVariableDeclarator() || path.isClassProperty();
    const isIndent = !looksLikeSwitchCase && !path.isClassMethod() && !insideFn && !isProperty;
    
    for (const {type, value} of leadingComments) {
        maybe.indent(isIndent);
        
        if (type === 'CommentLine') {
            maybeInsideFn(insideFn, {
                print,
                indent,
            });
            
            maybe.print.space(isProperty && !path.isClassProperty());
            print(`//${value}`);
            
            const isParentSwitch = path.parentPath.isSwitchCase();
            maybe.print.breakline(isProperty || isParentSwitch);
            maybe.print.newline(!isProperty && !isParentSwitch);
            continue;
        }
        
        if (type === 'CommentBlock') {
            const looksLikeMethod = path.isClassMethod();
            const looksLikeDirective = path.isDirective();
            const looksLikeProp = path.isObjectProperty();
            
            if (looksLikeProp)
                print.breakline();
            
            print(`/*${value}*/`);
            
            if (path.isStatement() || path.isTSEnumMember() || looksLikeDirective || looksLikeMethod || looksLikeProp || looksLikeSwitchCase) {
                print.newline();
                markBefore(path);
                maybe.indent(looksLikeMethod || looksLikeProp || looksLikeSwitchCase);
            }
            
            continue;
        }
    }
};
