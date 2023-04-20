'use strict';

const {JSXElement} = require('./jsx-element');
const {JSXAttribute} = require('./jsx-attribute');
const {isCoupleLines} = require('../is');
const {JSXOpeningElement} = require('./jsx-opening-element');
const fragments = require('./jsx-fragment');

module.exports = {
    ...fragments,
    JSXElement,
    JSXAttribute,
    JSXOpeningElement,
    JSXExpressionContainer(path, {print}) {
        print('{');
        print('__expression');
        print('}');
    },
    JSXIdentifier(path, {write}) {
        write(path.node.name);
    },
    JSXText(path, {write}) {
        const {value} = path.node;
        write(value);
    },
    JSXMemberExpression(path, {print}) {
        print('__object');
        print('.');
        print('__property');
    },
    JSXSpreadAttribute(path, {print, maybe}) {
        const isNewline = isCoupleLines(path.parentPath);
        maybe.indent.inc(isNewline);
        maybe.print.breakline(isNewline);
        print('{');
        print('...');
        print('__argument');
        print('}');
        maybe.indent.dec(isNewline);
    },
    JSXClosingElement(path, {print}) {
        print('</');
        print('__name');
        print('>');
    },
};
