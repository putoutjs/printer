'use strict';

const {types} = require('@putout/babel');
const {
    isCoupleLines,
    isStringAndIdentifier,
    isIdentifierAndIdentifier,
    isStringAndArray,
    isSimpleAndEmptyObject,
} = require('../../is');

const {
    isIncreaseIndent,
    isCurrentNewLine,
    isMultiLine,
} = require('./newline');

const {
    isInsideArray,
    isArrayInsideArray,
    isArrayIndented,
} = require('./indent');

const {
    isObjectExpression,
    isSpreadElement,
    isStringLiteral,
    isIdentifier,
    isArrayExpression,
    isCallExpression,
} = types;

const isNextString = (path) => isStringLiteral(path.getNextSibling());
const isPrevString = (path) => isStringLiteral(path.getPrevSibling());
const isAroundStrings = (path) => isNextString(path) || isPrevString(path);
const isNextObject = (a) => a.getNextSibling().isObjectExpression();
const isPrevObject = (a) => a.getPrevSibling().isObjectExpression();
const isObjectAfterSpread = (a) => isSpreadElement(a) && isNextObject(a) && !isPrevObject(a);
const isObjectAfterIdentifier = (a) => isIdentifier(a) && isNextObject(a) && !isPrevObject(a);

const isObjectAfterArray = (a) => {
    if (!isArrayExpression(a))
        return false;
    
    return isNextObject(a);
};

const isObjectAfterCall = (a) => {
    if (!isCallExpression(a))
        return false;
    
    return isNextObject(a);
};

const isObjectAfterSimple = (a) => {
    if (isObjectAfterArray(a))
        return true;
    
    if (isObjectAfterCall(a))
        return true;
    
    return isObjectAfterSpread(a) || isObjectAfterIdentifier(a);
};

const isSpreadBeforeObject = (a) => {
    if (!a.isObjectExpression())
        return false;
    
    const prev = a.getPrevSibling();
    
    if (!prev.isSpreadElement())
        return false;
    
    if (prev.getPrevSibling().isObjectExpression())
        return false;
    
    return prev
        .get('argument')
        .isCallExpression();
};

const isNextSimple = (a) => {
    const next = a.getNextSibling();
    
    if (next.isSpreadElement())
        return true;
    
    return next.isIdentifier();
};

const isNextSimpleBetweenObjects = (a) => {
    const next = a.getNextSibling();
    const is = next.isSpreadElement() || next.isIdentifier();
    
    if (!is)
        return true;
    
    return next
        .getNextSibling()
        .isObjectExpression();
};

const isInsideOneElementArray = ({parentPath}) => parentPath.node.elements.length === 1;

module.exports.ArrayExpression = {
    beforeIf(path) {
        const {parentPath} = path;
        const {elements} = path.node;
        
        if (!parentPath.isArrayExpression())
            return false;
        
        if (isCoupleLines(parentPath))
            return false;
        
        if (isStringAndIdentifier(elements) && isInsideOneElementArray(path))
            return true;
        
        return isIdentifierAndIdentifier(elements);
    },
    before(path, {print}) {
        print.breakline();
    },
    print(path, {print, maybe}, semantics) {
        const {
            maxElementsInOneLine,
            trailingComma,
        } = semantics;
        
        const elements = path.get('elements');
        const shouldIncreaseIndent = !isIncreaseIndent(path);
        
        print('[');
        
        const indented = isArrayIndented(path);
        
        if (indented)
            maybe.indent.inc(shouldIncreaseIndent);
        
        const isNewLine = isMultiLine(path, {
            elements,
            maxElementsInOneLine,
        });
        
        const n = elements.length - 1;
        
        maybe.print.newline(isNewLine && elements.length);
        
        for (const [index, element] of elements.entries()) {
            const is = isNewLine && isCurrentNewLine(element);
            
            if (isSimpleAfterObject(element))
                print.newline();
            
            maybe.indent(is);
            print(element);
            
            if (index < n || trailingComma)
                maybe.print(is, ',');
            
            maybe.print.newline((is || isSpreadBeforeObject(element)) && !isNextObject(element));
            maybe.print.space(is && isObjectAfterSimple(element));
            
            if (!is && index < n) {
                print(',');
                
                if (isNextSimpleBetweenObjects(element) || !(element.isObjectExpression() && isNextSimple(element)))
                    print.space();
            }
        }
        
        if (indented)
            maybe.indent.dec(shouldIncreaseIndent);
        
        const parentElements = path.parentPath.get('elements');
        
        if (isInsideArray(path) && isStringAndArray(parentElements)) {
            const parentCountTwo = parentElements.length === 2;
            const isHideIdent = !isAroundStrings(path) || parentCountTwo;
            
            maybe.indent.dec(isHideIdent);
            maybe.indent(elements.length && isNewLine);
            maybe.indent.inc(isHideIdent);
        } else if (!isArrayInsideArray(path) && !isObjectExpression(elements.at(-1))) {
            maybe.indent(elements.length && isNewLine);
        }
        
        if (isSimpleAndEmptyObject(elements) && !isSpreadElement(elements.at(-1))) {
            print(',');
            print.breakline();
        }
        
        print(']');
    },
    afterIf(path) {
        const {parentPath} = path;
        const {elements} = path.node;
        
        if (!parentPath.isArrayExpression())
            return false;
        
        if (isCoupleLines(parentPath))
            return false;
        
        if (isStringAndIdentifier(elements) && isInsideOneElementArray(path))
            return true;
        
        return isIdentifierAndIdentifier(elements);
    },
    after(path, {print, indent}) {
        indent.dec();
        print.breakline();
        indent.inc();
    },
};

function isSimpleAfterObject(path) {
    if (!isSpreadElement(path) && !isIdentifier(path))
        return;
    
    const prev = path.getPrevSibling();
    const next = path.getNextSibling();
    
    if (next.isObjectExpression())
        return false;
    
    return prev.isObjectExpression();
}
