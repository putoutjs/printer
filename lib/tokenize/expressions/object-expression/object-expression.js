import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {
    isCoupleLines,
    isForOf,
    isIf,
    noTrailingComment,
    isNewlineBetweenSiblings,
    hasLeadingComment,
    isInsideCall,
    isInsideBody,
    isInsideExpression,
    callWithNext,
    hasTrailingComment,
} from '#is';
import {parseComments} from '../../comment/comment.js';
import {isInsideTuple} from './is-inside-tuple.js';
import {isLooksLikeChain} from '../member-expression/is-looks-like-chain.js';

const hasNextLeadingComment = callWithNext(hasLeadingComment);

const notLastArgInsideCall = (path) => {
    const {parentPath} = path;
    
    if (!parentPath.isCallExpression())
        return false;
    
    if (isCoupleLines(path))
        return false;
    
    return path !== parentPath.get('arguments').at(-1);
};

const hasNoProperties = (path) => !path.node.properties.length;
const hasValue = (path) => path.node.properties[0].value;

const {
    isMemberExpression,
    isSpreadElement,
} = types;

const isParens = createTypeChecker([isInsideBody, isInsideExpression]);

const getCallee = (fn) => (a) => fn(a.get('callee'));

const isMemberExpressionCallee = createTypeChecker([
    ['-: parentPath -> !CallExpression'],
    ['-: parentPath -> !', getCallee(isMemberExpression)],
    ['+: parentPath', getCallee(isLooksLikeChain)],
]);

const isInsideNestedArrayCall = createTypeChecker([
    ['+', isInsideTuple],
    ['-: parentPath -> !ArrayExpression'],
    ['-: parentPath.parentPath -> !ArrayExpression'],
    ['+: parentPath.parentPath', isInsideCall],
]);

const isInsideTupleLike = createTypeChecker([
    ['+', isInsideTuple],
    ['+: parentPath.parentPath.node.elements.0 -> StringLiteral'],
]);

export const isManyLines = createTypeChecker([
    ['-', hasNoProperties],
    ['-: parentPath -> ForOfStatement'],
    ['+: node.properties.0 -> SpreadElement'],
    ['-', notLastArgInsideCall],
    ['-', isForOf],
    ['-', isIf],
    ['+', isCoupleLines],
    ['+', hasValue],
]);

const isManyLinesOption = (a, {manyLines}) => manyLines;

const isIndentBeforeProperty = createTypeChecker([
    ['-: -> !', isManyLinesOption],
    ['+: -> !', hasLeadingComment],
]);

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
    const manyLines = isManyLines(path);
    
    maybe.print(parens, '(');
    print('{');
    parseComments(path, printer, semantics);
    maybe.print.newline(manyLines);
    
    const n = properties.length - 1;
    
    const memberCallee = isMemberExpressionCallee(path);
    maybe.indent.inc(memberCallee);
    
    for (const [index, property] of properties.entries()) {
        const couple = length > 1;
        const isLast = index === n;
        
        if (isIndentBeforeProperty(property, {manyLines}))
            indent();
        
        print(property);
        
        if (property.isObjectMethod())
            continue;
        
        if (hasTrailingComment(property))
            continue;
        
        if (property.isSpreadElement() && ((couple || manyLines) && (!isLast || trailingComma)))
            print(',');
        
        if (!isSpreadElement(property) && !hasNextLeadingComment(property) && manyLines || property.isSpreadElement() && (couple || manyLines))
            print.newline();
        
        if (!isSpreadElement(property) && !hasNextLeadingComment(property))
            maybe.print.linebreak(isNewlineBetweenSiblings(property));
    }
    
    indent.dec();
    
    if (isIndentBeforeClosingCurlyBrace(path, {manyLines}))
        indent();
    
    if (insideNestedArrayCall)
        indent.inc();
    
    print('}');
    maybe.print(parens, ')');
    
    maybe.indent.dec(memberCallee);
};

const isIndentBeforeClosingCurlyBrace = createTypeChecker([
    ['+', isInsideTupleLike],
    ['-: -> !', isManyLinesOption],
    ['+: -> !', isInsideNestedArrayCall],
]);

