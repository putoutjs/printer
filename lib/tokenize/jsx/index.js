'use strict';

const {JSXElement} = require('./jsx-element');
const {JSXAttribute} = require('./jsx-attribute');
const {isCoupleLines} = require('../is');

module.exports = {
    JSXElement,
    JSXAttribute,
    JSXOpeningElement(path, {print, maybe}) {
        print('<');
        print('__name');
        
        const noCoupleLine = !isCoupleLines(path);
        
        for (const attr of path.get('attributes')) {
            maybe.print.space(noCoupleLine);
            print(attr);
        }
        
        if (isCoupleLines(path))
            print.breakline();
        
        if (path.node.selfClosing)
            print('/');
        
        print('>');
    },
    JSXExpressionContainer(path, {print}) {
        print('{');
        print('__expression');
        print('}');
    },
    JSXIdentifier(path, {write}) {
        write(path.node.name);
    },
    JSXText(path, {write}) {
        write(path.node.value);
    },
    JSXClosingElement(path, {print}) {
        print('</');
        print('__name');
        print('>');
    },
};
