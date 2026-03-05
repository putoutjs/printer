import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {
    isCoupleLines,
    isForOf,
    isIf,
    noTrailingComment,
    isNewlineBetweenSiblings,
    noLeadingComment,
    hasLeadingComment,
    exists,
    isInsideCall,
    isInsideBody,
    isInsideExpression,
} from '#is';
import {parseComments} from '../../comment/comment.js';
import {isInsideTuple} from './is-inside-tuple.js';
import {isLooksLikeChain} from '../member-expression/is-looks-like-chain.js';

const {
    isStringLiteral,
    isSpreadElement,
    isMemberExpression,
} = types;

const isLogical = (path) => path.get('argument').isLogicalExpression();
const isValue = (path) => path.get('properties.0.value').node;

const isParens = createTypeChecker([isInsideBody, isInsideExpression]);
const getCallee = (fn) => (a) => fn(a.get('callee'));

const isMemberExpressionCallee = createTypeChecker([
    '-: parentPath -> !CallExpression',
    ['-: parentPath -> !', getCallee(isMemberExpression)],
    ['+: parentPath', getCallee(isLooksLikeChain)],
]);

const isInsideNestedArrayCall = createTypeChecker([
    isInsideTuple,
    '-: parentPath -> !ArrayExpression',
    '-: parentPath.parentPath -> !ArrayExpression',
    ['+: parentPath.parentPath', isInsideCall],
]);

function isInsideNestedTuple({parentPath}) {
    const {elements} = parentPath.parentPath.node;
    const [first] = elements;
    
    return isStringLiteral(first);
}

export const ObjectExpression = (path, printer, semantics) => {
    const {trailingComma} = semantics;
    const {
        print,
        maybe,
        indent,
    } = printer;
    
    const insideNestedArrayCall = isInsideNestedArrayCall(path);
    
    maybe.indent.inc(!insideNestedArrayCall);
    
    const properties = path.get('properties');
    const {length} = properties;
    const parens = isParens(path);
    const manyLines = !isOneLine(path);
    
    maybe.print(parens, '(');
    print('{');
    parseComments(path, printer, semantics);
    maybe.print.newline(manyLines);
    
    const n = properties.length - 1;
    
    const memberCallee = isMemberExpressionCallee(path);
    maybe.indent.inc(memberCallee);
    
    for (const [index, property] of properties.entries()) {
        if (property.isSpreadElement()) {
            const logical = isLogical(property);
            
            if (noLeadingComment(property))
                maybe.indent(length > 1 || logical || manyLines);
            
            print(property);
            
            if (noTrailingComment(property) && (length > 1 || manyLines)) {
                maybe.print(index !== n || trailingComma, ',');
                print.newline();
            }
            
            continue;
        }
        
        maybe.indent(manyLines && noLeadingComment(property));
        print(property);
        
        if (property.isObjectMethod())
            continue;
        
        if (noTrailingComment(property) && !hasNextLeadingComment(property)) {
            maybe.print.newline(manyLines);
            maybe.print.linebreak(isNewlineBetweenSiblings(property));
        }
    }
    
    if (!insideNestedArrayCall) {
        indent.dec();
        maybe.indent(manyLines);
    } else if (isInsideTuple(path) || isInsideNestedTuple(path)) {
        indent.dec();
        indent();
        indent.inc();
    }
    
    print('}');
    maybe.print(parens, ')');
    
    maybe.indent.dec(memberCallee);
};

const hasNextLeadingComment = (path) => {
    const next = path.getNextSibling();
    
    if (!exists(next))
        return false;
    
    return hasLeadingComment(next);
};

const notLastArgInsideCall = (path) => {
    const {parentPath} = path;
    
    if (!parentPath.isCallExpression())
        return false;
    
    if (isCoupleLines(path))
        return false;
    
    return path !== parentPath.get('arguments').at(-1);
};

const ONE_LINE = true;
const MANY_LINES = false;

const isFirstSpread = (path) => {
    const [first] = path.get('properties');
    
    if (!isSpreadElement(first))
        return false;
    
    return !path.parentPath.isForOfStatement();
};

export function isOneLine(path) {
    const {length} = path.get('properties');
    
    if (!length)
        return ONE_LINE;
    
    if (isFirstSpread(path))
        return MANY_LINES;
    
    if (notLastArgInsideCall(path))
        return ONE_LINE;
    
    if (isForOf(path))
        return ONE_LINE;
    
    if (isIf(path))
        return ONE_LINE;
    
    if (isCoupleLines(path))
        return MANY_LINES;
    
    return !isValue(path);
}
