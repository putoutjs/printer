'use strict';

const {
    isCoupleLines,
    isStringAndIdentifier,
    isIdentifierAndIdentifier,
    isStringAndArray,
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

const {types} = require('@putout/babel');
const {
    isObjectExpression,
    isSpreadElement,
} = types;

const isNextObject = (a) => a.getNextSibling().isObjectExpression();
const isPrevObject = (a) => a.getPrevSibling().isObjectExpression();
const isObjectAfterSpread = (a) => isSpreadElement(a) && isNextObject(a) && !isPrevObject(a);

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
    print(path, {print, maybe, indent}, semantics) {
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
            maybe.indent(is);
            print(element);
            
            if (index < n || trailingComma)
                maybe.print(is, ',');
            
            maybe.print.newline(is && !isNextObject(element));
            maybe.print.space(isObjectAfterSpread(element));
            
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
        } else if (!isArrayInsideArray(path) && !isObjectExpression(elements.at(-1))) {
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
