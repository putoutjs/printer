import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {callWithNext, callWithPrev} from '#is';
import {
    isIndentBeforeElement,
    isMultiLine,
} from './newline.js';
import {
    isNeedIndent,
    maybeAdditionalIndent,
} from './indent.js';
import {beforeIf} from './before-if.js';
import {afterIf} from './after-if.js';
import {
    isCommaBeforeClosingSquareBrace,
    isNewlineAfterComma,
    isSpaceAfterComa,
} from './comma.js';

const {isObjectExpression} = types;

export const ArrayExpression = {
    beforeIf,
    before(path, {print}) {
        print.breakline();
    },
    print(path, printer, semantics) {
        const {
            print,
            maybe,
            indent,
        } = printer;
        
        const {
            maxElementsInOneLine,
            trailingComma,
            maxElementLengthInOneLine,
        } = semantics;
        
        const needIndent = isNeedIndent(path);
        
        const multiline = isMultiLine(path, {
            maxElementsInOneLine,
            maxElementLengthInOneLine,
        });
        
        const elements = path.get('elements');
        
        print('[');
        maybe.indent.inc(needIndent);
        maybe.print.newline(multiline);
        
        const n = elements.length - 1;
        
        for (const [index, element] of elements.entries()) {
            const isLast = index === n;
            const needsIndentBeforeElement = isIndentBeforeElement(element, {
                multiline,
            });
            const needsComma = needsIndentBeforeElement && trailingComma || !isLast;
            
            if (isNewlineBeforeElement(element))
                print.newline();
            
            if (needsIndentBeforeElement)
                indent();
            
            print(element);
            
            if (needsComma)
                print(',');
            
            if (isNewlineAfterComma(element, {multiline})) {
                print.newline();
                continue;
            }
            
            if (isSpaceAfterComa(element, {isLast}))
                print.space();
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
    afterIf,
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

const isNewlineBeforeElement = createTypeChecker([
    ['-', isSimple],
    ['-', callWithNext(isObjectExpression)],
    ['+', callWithPrev(isObjectExpression)],
]);
