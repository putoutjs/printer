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
} = types;

const isNextString = (path) => isStringLiteral(path.getNextSibling());
const isPrevString = (path) => isStringLiteral(path.getPrevSibling());
const isAroundStrings = (path) => isNextString(path) || isPrevString(path);
const isNextObject = (a) => a.getNextSibling().isObjectExpression();
const isPrevObject = (a) => a.getPrevSibling().isObjectExpression();
const isObjectAfterSpread = (a) => isSpreadElement(a) && isNextObject(a) && !isPrevObject(a);
const isObjectAfterIdentifier = (a) => isIdentifier(a) && isNextObject(a) && !isPrevObject(a);
const isObjectAfterSimple = (a) => isObjectAfterSpread(a) || isObjectAfterIdentifier(a);
const isNextSpread = (a) => a.getNextSibling().isSpreadElement();

const isNextSpreadBetweenObjects = (a) => {
    const next = a.getNextSibling();
    const is = next.isSpreadElement();
    
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
            
            if (index && isSpreadElement(element) && !isNextSpread(element) && !isNextObject(element))
                print.newline();
            
            maybe.indent(is);
            print(element);
            
            if (index < n || trailingComma)
                maybe.print(is, ',');
            
            maybe.print.newline(is && !isNextObject(element));
            maybe.print.space(is && isObjectAfterSimple(element));
            
            if (!is && index < n) {
                print(',');
                
                if (isNextSpreadBetweenObjects(element) || !(element.isObjectExpression() && isNextSpread(element)))
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
