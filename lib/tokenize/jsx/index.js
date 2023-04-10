'use strict';

const {JSXElement} = require('./jsx-element');

module.exports = {
    JSXElement,
    JSXOpeningElement(path, {print}) {
        print('<');
        print('__name');
        print('>');
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
