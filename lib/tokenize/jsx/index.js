import {isCoupleLines} from '#is';
import {parseComments} from '../comment/comment.js';

export {JSXElement} from './jsx-element.js';
export {JSXAttribute} from './jsx-attribute.js';
export {JSXOpeningElement} from './jsx-opening-element.js';
export * from './jsx-fragment.js';
export {JSXText} from './jsx-text/jsx-text.js';

export const JSXEmptyExpression = (path, operations, semantics) => {
    parseComments(path, operations, semantics);
};
export const JSXExpressionContainer = (path, {print}) => {
    print('{');
    print('__expression');
    print('}');
};
export const JSXIdentifier = (path, {write}) => {
    write(path.node.name);
};
export const JSXMemberExpression = (path, {print}) => {
    print('__object');
    print('.');
    print('__property');
};
export const JSXSpreadAttribute = (path, {print, maybe}) => {
    const isNewline = isCoupleLines(path.parentPath);
    maybe.indent.inc(isNewline);
    maybe.print.breakline(isNewline);
    print('{');
    print('...');
    print('__argument');
    print('}');
    maybe.indent.dec(isNewline);
};
export const JSXClosingElement = (path, {print}) => {
    print('</');
    print('__name');
    print('>');
};
