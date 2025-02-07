'use strict';

const {TemplateLiteral} = require('./template-literal');
const {Identifier} = require('./identifier');

const {Decorator} = require('../expressions/decorator/decorator');
const {StringLiteral} = require('./string-literal');

module.exports = {
    Identifier,
    Decorator,
    TemplateLiteral,
    BigIntLiteral(path, {write}) {
        write(path.node.raw);
    },
    NumericLiteral(path, {write}) {
        const {
            raw,
            extra,
            value,
        } = path.node;
        
        write(raw || extra?.raw || value);
    },
    Directive(path, {print, maybe}) {
        maybe.print.breakline(path.node.leadingComments?.length);
        print('__value');
    },
    DirectiveLiteral(path, {write}) {
        write.indent();
        write(path.node.raw);
        write(';');
        write.newline();
    },
    BooleanLiteral(path, {write}) {
        write(path.node.value);
    },
    StringLiteral,
    RegExpLiteral(path, {print}) {
        const {raw, pattern} = path.node;
        print(raw || `/${pattern}/`);
    },
    NullLiteral(path, {write}) {
        write('null');
    },
    MetaProperty(path, {write}) {
        write('import.meta');
    },
    Super(path, {write}) {
        write('super');
    },
};
