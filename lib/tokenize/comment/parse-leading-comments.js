'use strict';

const {types} = require('@putout/babel');
const {
    hasTrailingComment,
    satisfy,
    isPrev,
} = require('../is');

const {markBefore} = require('../mark');
const {maybeInsideFn} = require('./maybe-inside-fn');

const {
    isObjectProperty,
    isVariableDeclarator,
    isClassProperty,
    isTSPropertySignature,
} = types;

const isProperty = satisfy([
    isObjectProperty,
    isVariableDeclarator,
    isClassProperty,
    isTSPropertySignature,
]);

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
    
    const propIs = isProperty(path);
    const isIndent = !looksLikeSwitchCase && !path.isClassMethod() && !insideFn && !propIs;
    
    for (const {type, value} of leadingComments) {
        maybe.indent(isIndent);
        
        if (type === 'CommentLine') {
            maybeInsideFn(insideFn, {
                print,
                indent,
            });
            
            maybe.print.space(propIs && !path.isClassProperty());
            print(`//${value}`);
            
            const isParentSwitch = path.parentPath.isSwitchCase();
            maybe.print.breakline(propIs || isParentSwitch);
            maybe.print.newline(!propIs && !isParentSwitch);
            continue;
        }
        
        if (type === 'CommentBlock') {
            const looksLikeMethod = path.isClassMethod();
            const looksLikeDirective = path.isDirective();
            const looksLikeProp = path.isObjectProperty();
            
            if (looksLikeProp)
                print.breakline();
            
            print(`/*${value}*/`);
            
            if (isTSPropertySignature(path) && !isPrev(path))
                print.breakline();
            
            if (path.isStatement() || path.isTSEnumMember() || looksLikeDirective || looksLikeMethod || looksLikeProp || looksLikeSwitchCase) {
                print.newline();
                markBefore(path);
                maybe.indent(looksLikeMethod || looksLikeProp || looksLikeSwitchCase);
            }
            
            continue;
        }
    }
};
