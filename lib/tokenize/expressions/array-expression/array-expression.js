'use strict';

const {types} = require('@putout/babel');
const {
    isCoupleLines,
    isStringAndIdentifier,
    isIdentifierAndIdentifier,
    isStringAndArray,
    isSimpleAndNotEmptyObject,
    isNextObject,
} = require('#is');

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
    isObjectAfterSimple,
    isNextSimple,
} = require('./is-object-after-simple');

const {
    isObjectExpression,
    isSpreadElement,
    isStringLiteral,
    isIdentifier,
    isFunction,
    isCallExpression,
    isObjectProperty,
} = types;

const isNextString = (path) => isStringLiteral(path.getNextSibling());
const isPrevString = (path) => isStringLiteral(path.getPrevSibling());
const isAroundStrings = (path) => isNextString(path) || isPrevString(path);

const isSpreadBeforeObject = (a) => {
    if (!a.isObjectExpression())
        return false;
    
    const prev = a.getPrevSibling();
    
    if (!prev.isSpreadElement())
        return false;
    
    const argCall = prev.get('argument');
    
    if (argCall.isCallExpression()) {
        const [first] = argCall.get('arguments');
        
        if (isFunction(first))
            return false;
    }
    
    if (prev.getPrevSibling().isObjectExpression())
        return false;
    
    return prev.get('argument').isCallExpression();
};

const isNextSimpleBetweenObjects = (a) => {
    const next = a.getNextSibling();
    const is = next.isSpreadElement() || next.isIdentifier() || next.isCallExpression();
    
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
        
        maybe.indent.inc(indented && shouldIncreaseIndent);
        
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
            
            if (!(isObjectExpression(element) && isObjectProperty(path.parentPath)))
                maybe.print.newline((is || isSpreadBeforeObject(element)) && !isNextObject(element) && !isObjectExpression(element));
            
            maybe.print.space(is && isObjectAfterSimple(element));
            
            if (!is && index < n) {
                print(',');
                
                if (isNextSimpleBetweenObjects(element) || !(element.isObjectExpression() && isNextSimple(element)))
                    print.space();
            }
        }
        
        maybe.indent.dec(indented && shouldIncreaseIndent);
        
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
        
        if (isSimpleAndNotEmptyObject(elements) && !isSpreadElement(elements.at(-1)) && !isCallExpression(elements.at(-1))) {
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
    if (!isSpreadElement(path) && !isIdentifier(path) && !isCallExpression(path))
        return;
    
    const prev = path.getPrevSibling();
    const next = path.getNextSibling();
    
    if (next.isObjectExpression())
        return false;
    
    return prev.isObjectExpression();
}
