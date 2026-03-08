import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {
    isCoupleLines,
    isStringAndIdentifier,
    isIdentifierAndIdentifier,
    isSimpleAndNotEmptyObject,
    callWithNext,
    callWithPrev,
} from '#is';
import {
    isCurrentNewLine,
    isMultiLine,
} from './newline.js';
import {isObjectAfterSimple} from './is-object-after-simple.js';
import {
    isNeedIndent,
    maybeAdditionalIndent,
} from './indent.js';
import {
    beforeIf,
    isInsideOneElementArray,
} from './before-if.js';
import {
    isCommaBeforeClosingSquareBrace,
    isNewlineAfterComma,
} from './comma.js';

const {
    isObjectExpression,
    isSpreadElement,
    isIdentifier,
    isCallExpression,
} = types;

const isSimpleBetweenObjects = createTypeChecker([
    ['+', callWithNext(isObjectExpression)],
    ['-', isSpreadElement],
    ['-', isIdentifier],
    ['+: -> !', isCallExpression],
]);

const isSpaceAfterComa = createTypeChecker([
    ['+', callWithNext(isSimpleBetweenObjects)],
    ['+: -> !ObjectExpression'],
]);

export const ArrayExpression = {
    beforeIf,
    before(path, {print}) {
        print.breakline();
    },
    print(path, printer, semantics) {
        const {print, maybe} = printer;
        
        const {
            maxElementsInOneLine,
            trailingComma,
            maxElementLengthInOneLine,
        } = semantics;
        
        const elements = path.get('elements');
        
        print('[');
        
        const needIndent = isNeedIndent(path);
        
        maybe.indent.inc(needIndent);
        
        const multiline = isMultiLine(path, {
            maxElementsInOneLine,
            maxElementLengthInOneLine,
        });
        
        const n = elements.length - 1;
        
        if (multiline)
            print.newline();
        
        for (const [index, element] of elements.entries()) {
            const isLast = index === n;
            const needsComma = trailingComma || !isLast;
            const needsNewline = multiline && isCurrentNewLine(element);
            
            if (isSimpleAfterObject(element))
                print.newline();
            
            maybe.indent(needsNewline);
            print(element);
            
            if (needsComma && needsNewline)
                print(',');
            
            if (multiline && isNewlineAfterComma(element))
                print.newline();
            
            maybe.print.space(needsNewline && isObjectAfterSimple(element));
            
            if (!needsNewline && !isLast) {
                print(',');
                maybe.print.space(isSpaceAfterComa(element));
            }
        }
        
        maybe.indent.dec(needIndent);
        maybeAdditionalIndent(path, printer, semantics, {
            multiline,
        });
        
        if (isCommaBeforeClosingSquareBrace(path)) {
            print(',');
            print.breakline();
        }
        
        print(']');
    },
    afterIf(path) {
        const {parentPath} = path;
        
        if (!parentPath.isArrayExpression())
            return false;
        
        if (isCoupleLines(parentPath))
            return false;
        
        if (isStringAndIdentifier(path) && isInsideOneElementArray(path))
            return true;
        
        return isIdentifierAndIdentifier(path);
    },
    after(path, {print, indent}) {
        indent.dec();
        print.breakline();
        indent.inc();
    },
};

const isSimple = createTypeChecker([
    '-: -> SpreadElement',
    '-: -> Identifier',
    '+: -> !CallExpression',
]);

const isSimpleAfterObject = createTypeChecker([
    ['-', isSimple],
    ['-', callWithNext(isObjectExpression)],
    ['+', callWithPrev(isObjectExpression)],
]);
