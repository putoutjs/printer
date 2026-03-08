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
    isNewlineAfterComma,
} from './newline.js';
import {isObjectAfterSimple} from './is-object-after-simple.js';
import {
    isNeedIndent,
    maybeSecondIndent,
} from './indent.js';
import {
    beforeIf,
    isInsideOneElementArray,
} from './before-if.js';

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
        
        const needsNewline = isMultiLine(path, {
            maxElementsInOneLine,
            maxElementLengthInOneLine,
        });
        
        const n = elements.length - 1;
        
        if (needsNewline)
            print.newline();
        
        for (const [index, element] of elements.entries()) {
            const is = needsNewline && isCurrentNewLine(element);
            
            if (isSimpleAfterObject(element))
                print.newline();
            
            maybe.indent(is);
            print(element);
            
            if (index < n || trailingComma)
                maybe.print(is, ',');
            
            if (needsNewline && isNewlineAfterComma(element))
                print.newline();
            
            maybe.print.space(is && isObjectAfterSimple(element));
            
            if (!is && index < n) {
                print(',');
                maybe.print.space(isSpaceAfterComa(element));
            }
        }
        
        maybe.indent.dec(needIndent);
        maybeSecondIndent(path, printer, semantics, {
            needsNewline,
        });
        
        if (isSimpleAndNotEmptyObject(path) && !isSpreadElement(elements.at(-1)) && !isCallExpression(elements.at(-1))) {
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
