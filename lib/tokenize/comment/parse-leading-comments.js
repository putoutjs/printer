'use strict';

const {types} = require('@putout/babel');
const {
    hasTrailingComment,
    satisfy,
    isPrev,
} = require('../is');

const {markBefore} = require('../mark');
const {maybeInsideFn} = require('./maybe-inside-fn');

const deduplicate = (a) => Array.from(new Set(a));

const {
    isObjectProperty,
    isVariableDeclarator,
    isClassProperty,
    isTSPropertySignature,
    isSpreadElement,
} = types;

const isProperty = satisfy([
    isObjectProperty,
    isVariableDeclarator,
    isClassProperty,
    isTSPropertySignature,
    isSpreadElement,
]);

function isCommentOfPrevious(path) {
    const [comment] = path.node.leadingComments;
    const {line} = comment.loc.start;
    
    return path.getPrevSibling().node?.loc.start.line === line;
}

function isCommentOnPreviousLine(path) {
    const {
        loc,
        leadingComments,
    } = path.node;
    
    if (!isProperty(path))
        return false;
    
    const [comment] = leadingComments;
    const {line} = comment.loc.start;
    
    if (isCommentOfPrevious(path))
        return false;
    
    return line === loc.start.line - 1;
}

const isFirst = (path) => path === path.parentPath?.get('properties')[0];

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
    const isIndent = isFirst(path) || !looksLikeSwitchCase && !path.isClassMethod() && !insideFn && !propIs;
    
    for (const {type, value} of deduplicate(leadingComments)) {
        maybe.indent(isIndent);
        
        if (type === 'CommentLine') {
            maybeInsideFn(insideFn, {
                print,
                indent,
            });
            
            if (isCommentOnPreviousLine(path))
                maybe.print.breakline(!isFirst(path));
            else
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
