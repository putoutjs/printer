import {types} from '@putout/babel';

const {
    isStringLiteral,
    isObjectExpression,
} = types;

export const isMultilineOption = (a, {multiline}) => multiline;
export const isNeedsToHideIndentOption = (a, {needsToHideIndent}) => needsToHideIndent;
export const isLastOption = (a, {isLast}) => isLast;

export const isTrailingCommaOption = (a, {trailingComma}) => trailingComma;
export const isNeedsIndentBeforeElementOption = (a, {needsIndentBeforeElement}) => needsIndentBeforeElement;

export const isStringsAndObject = (path) => {
    const elements = path.get('elements');
    
    if (!isObjectExpression(elements.at(-1)))
        return false;
    
    const strings = elements.filter(isStringLiteral);
    
    return strings.length === elements.length - 1;
};
