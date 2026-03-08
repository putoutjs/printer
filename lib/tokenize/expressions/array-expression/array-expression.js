import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {
    isCoupleLines,
    isStringAndIdentifier,
    isIdentifierAndIdentifier,
    isStringAndArray,
    isSimpleAndNotEmptyObject,
    isNextObject,
    callWithNext,
    isInsideArray,
    callWithPrev,
} from '#is';
import {
    isCurrentNewLine,
    isMultiLine,
} from './newline.js';
import {isObjectAfterSimple} from './is-object-after-simple.js';
import {
    isArrayInsideArray,
    isNeedIndent,
} from './indent.js';
import {
    beforeIf,
    isInsideOneElementArray,
} from './before-if.js';

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
    print(path, {print, maybe}, semantics) {
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
            
            if (!(isObjectExpression(element) && isObjectProperty(path.parentPath)))
                maybe.print.newline((is || isSpreadBeforeObject(element)) && !isNextObject(element) && !isObjectExpression(element));
            
            maybe.print.space(is && isObjectAfterSimple(element));
            
            if (!is && index < n) {
                print(',');
                
                if (isSpaceAfterComa(element))
                    print.space();
            }
        }
        
        maybe.indent.dec(needIndent);
        
        const parentElements = path.parentPath.get('elements');
        
        if (isInsideArray(path) && isStringAndArray(path.parentPath)) {
            const parentCountTwo = parentElements.length === 2;
            const isHideIdent = !isAroundStrings(path) || parentCountTwo;
            
            maybe.indent.dec(isHideIdent);
            maybe.indent(elements.length && needsNewline);
            maybe.indent.inc(isHideIdent);
        } else if (!isArrayInsideArray(path) && !isObjectExpression(elements.at(-1))) {
            maybe.indent(elements.length && needsNewline);
        }
        
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
