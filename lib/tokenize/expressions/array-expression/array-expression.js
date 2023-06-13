'use strict';

const {
    isCoupleLines,
    isStringAndIdentifier,
    isIdentifierAndIdentifier,
    isStringAndArray,
} = require('../../is');

const {
    isNewlineBetweenElements,
    isIncreaseIndent,
} = require('./new-line');

const isInsideOneElementArray = ({parentPath}) => parentPath.node.elements.length === 1;
const isInsideArray = (path) => path.parentPath.isArrayExpression();

const isTwoLongStrings = ([a, b]) => {
    const LONG_STRING = 20;
    
    if (!a?.isStringLiteral() || !b?.isStringLiteral())
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
        const {maxElementsInOneLine} = semantics;
        const elements = path.get('elements');
        const shouldIncreaseIndent = !isIncreaseIndent(path);
        
        print('[');
        
        if (!isTwoLongStrings(elements))
            maybe.indent.inc(shouldIncreaseIndent);
        
        const isNewLine = isNewlineBetweenElements(path, {
            elements,
            maxElementsInOneLine,
        });
        
        const n = elements.length - 1;
        
        maybe.print.newline(isNewLine && elements.length);
        
        for (const [index, element] of elements.entries()) {
            maybe.indent(isNewLine);
            print(element);
            maybe.print(isNewLine, ',');
            maybe.print.newline(isNewLine);
            
            if (!isNewLine && index < n) {
                print(',');
                print.space();
            }
        }
        
        if (!isTwoLongStrings(elements))
            maybe.indent.dec(shouldIncreaseIndent);
        
        const parentElements = path.parentPath.get('elements');
        
        if (isInsideArray(path) && isStringAndArray(parentElements)) {
            indent.dec();
            maybe.indent(elements.length && isNewLine);
            indent.inc();
        } else {
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
