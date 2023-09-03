'use strict';

const {
    isCoupleLines,
    isStringAndIdentifier,
    isIdentifierAndIdentifier,
    isStringAndArray,
    isIndented,
} = require('../../is');

const {
    isNewlineBetweenElements,
    isIncreaseIndent,
    isCurrentNewLine,
} = require('./new-line');

const {
    isObjectExpression,
    isStringLiteral,
} = require('@babel/types');

const isNextObject = (a) => a.getNextSibling().isObjectExpression();

const isInsideOneElementArray = ({parentPath}) => parentPath.node.elements.length === 1;
const isInsideArray = (path) => path.parentPath.isArrayExpression();

const isTwoLongStrings = ([a, b]) => {
    const LONG_STRING = 20;
    
    if (!isStringLiteral(a) || !isStringLiteral(b))
        return false;
    
    return a.node.value.length > LONG_STRING;
};

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
    print(path, {print, maybe, indent}, semantics) {
        const {
            maxElementsInOneLine,
            trailingComma,
        } = semantics;
        
        const elements = path.get('elements');
        const shouldIncreaseIndent = !isIncreaseIndent(path);
        
        print('[');
        
        const indented = !isTwoLongStrings(elements) || !isInsideArray(path) && isIndented(elements[0]);
        
        if (indented) {
            maybe.indent.inc(shouldIncreaseIndent);
        }
        
        const isNewLine = isNewlineBetweenElements(path, {
            elements,
            maxElementsInOneLine,
        });
        
        const n = elements.length - 1;
        
        maybe.print.newline(isNewLine && elements.length);
        
        for (const [index, element] of elements.entries()) {
            const is = isNewLine && isCurrentNewLine(element);
            maybe.indent(is);
            print(element);
            
            if (index < n || trailingComma)
                maybe.print(is, ',');
            
            maybe.print.newline(is && !isNextObject(element));
            maybe.print.space(element.isSpreadElement() && isNextObject(element));
            
            if (!is && index < n) {
                print(',');
                print.space();
            }
        }
        
        if (indented)
            maybe.indent.dec(shouldIncreaseIndent);
        
        const parentElements = path.parentPath.get('elements');
        
        if (isInsideArray(path) && isStringAndArray(parentElements)) {
            indent.dec();
            maybe.indent(elements.length && isNewLine);
            indent.inc();
        } else if (!isObjectExpression(elements.at(-1))) {
            maybe.indent(elements.length && isNewLine);
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
