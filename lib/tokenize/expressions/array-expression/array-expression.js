import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {callWithNext, callWithPrev} from '#is';
import {
    isCurrentNewLine,
    isMultiLine,
} from './newline.js';
import {isObjectAfterSimple} from './is-object-after-simple.js';
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
            const needsNewline = multiline && isCurrentNewLine(element);
            const needsComma = needsNewline && trailingComma || !isLast;
            
            if (isSimpleAfterObject(element))
                print.newline();
            
            maybe.indent(needsNewline);
            print(element);
            
            if (needsComma)
                print(',');
            
            if (multiline && isNewlineAfterComma(element)) {
                print.newline();
                continue;
            }
            
            if (isLast)
                continue;
            
            if (isSpaceAfterComa(element) || isObjectAfterSimple(element))
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

const isSimpleAfterObject = createTypeChecker([
    ['-', isSimple],
    ['-', callWithNext(isObjectExpression)],
    ['+', callWithPrev(isObjectExpression)],
]);

