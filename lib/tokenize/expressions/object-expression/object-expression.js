import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {
    isCoupleLines,
    isForOf,
    isIf,
    hasLeadingComment,
    isInsideCall,
    isInsideBody,
    isInsideExpression,
    hasTrailingComment,
} from '#is';
import {parseComments} from '../../comment/comment.js';
import {isInsideTuple} from './is-inside-tuple.js';
import {isLooksLikeChain} from '../member-expression/is-looks-like-chain.js';
import {isCommaAfterSpread} from './comma.js';
import {isMultilineOption} from '../array-expression/is.js';
import {isLinebreakAfterProperty} from './linebreak.js';
import {isNewlineAfterProperty} from './newline.js';

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

const {isMemberExpression} = types;

const isParens = createTypeChecker([isInsideBody, isInsideExpression]);

const callWithCallee = (fn) => (a) => fn(a.get('callee'));

const isMemberExpressionCallee = createTypeChecker([
    ['-: parentPath -> !CallExpression'],
    ['-: parentPath -> !', callWithCallee(isMemberExpression)],
    ['+: parentPath', callWithCallee(isLooksLikeChain)],
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

export const isMultiline = createTypeChecker([
    ['-', hasNoProperties],
    ['-: parentPath -> ForOfStatement'],
    ['-', notLastArgInsideCall],
    ['-', isForOf],
    ['-', isIf],
    ['+: node.properties.0 -> SpreadElement'],
    ['+', isCoupleLines],
    ['+', hasValue],
]);

const isIndentBeforeProperty = createTypeChecker([
    ['-: -> !', isMultilineOption],
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
    
    const parens = isParens(path);
    const multiline = isMultiline(path);
    
    maybe.print(parens, '(');
    print('{');
    parseComments(path, printer, semantics);
    maybe.print.newline(multiline);
    
    const memberCallee = isMemberExpressionCallee(path);
    maybe.indent.inc(memberCallee);
    
    for (const property of properties) {
        if (isIndentBeforeProperty(property, {multiline}))
            indent();
        
        print(property);
        
        if (property.isObjectMethod())
            continue;
        
        if (hasTrailingComment(property))
            continue;
        
        maybe.print(isCommaAfterSpread(property, {
            multiline,
            trailingComma,
        }), ',');
        
        if (isNewlineAfterProperty(property, {multiline}))
            print.newline();
        
        if (isLinebreakAfterProperty(property))
            print.linebreak();
    }
    
    indent.dec();
    
    if (isIndentBeforeClosingCurlyBrace(path, {multiline}))
        indent();
    
    if (insideNestedArrayCall)
        indent.inc();
    
    print('}');
    maybe.print(parens, ')');
    
    maybe.indent.dec(memberCallee);
};

const isIndentBeforeClosingCurlyBrace = createTypeChecker([
    ['+', isInsideTupleLike],
    ['-: -> !', isMultilineOption],
    ['+: -> !', isInsideNestedArrayCall],
]);
