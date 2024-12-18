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
    isSpreadElement,
} = types;

const isProperty = satisfy([
    isObjectProperty,
    isVariableDeclarator,
    isClassProperty,
    isTSPropertySignature,
    isSpreadElement,
]);

const isInsideVar = ({parentPath}) => {
    if (isVariableDeclarator(parentPath))
        return true;
    
    return isVariableDeclarator(parentPath.parentPath);
};

const hasDecorators = (path) => {
    const {parentPath} = path;
    
    if (path.node.decorators?.length)
        return true;
    
    return parentPath.node.decorators?.length;
};

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
    
    if (hasDecorators(path))
        return;
    
    const looksLikeSwitchCase = path.isSwitchCase();
    
    if (!looksLikeSwitchCase && hasTrailingComment(path.getPrevSibling()))
        return;
    
    const insideFn = (path.parentPath.isFunction() || path.parentPath.isTSDeclareMethod()) && !path.isTSTypeParameterDeclaration();
    
    const propIs = isProperty(path);
    const isIndent = isFirst(path) || !looksLikeSwitchCase && !path.isClassMethod() && !insideFn && !propIs;
    
    for (const {type, value} of leadingComments) {
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
            
            maybe.print.breakline(propIs);
            maybe.print.newline(!propIs);
            
            if (isInsideVar(path)) {
                indent.inc();
                indent();
                indent.dec();
            }
            
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
