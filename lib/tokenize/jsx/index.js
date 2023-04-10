'use strict';

const {JSXElement} = require('./jsx-element');

module.exports = {
    JSXElement,
    JSXOpeningElement(path, {print}) {
        print('<');
        print('__name');
        
        for (const attr of path.get('attributes')) {
            print.space();
            print(attr);
        }
        
        print('>');
    },
    JSXAttribute(path, {write, print}) {
        print('__name');
        print('=');
        print('__value');
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

