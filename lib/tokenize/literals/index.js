'use strict';

const {TemplateLiteral} = require('./template-literal');

const {Identifier} = require('./identifier');

module.exports = {
    Identifier,
    TemplateLiteral,
    BigIntLiteral(path, {write}) {
        write(path.node.raw);
    },
    Decorator(path, {print}) {
        print('@');
        print('__expression');
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
    StringLiteral(path, {write}) {
        const {raw, value} = path.node;
        
        if (raw && path.parentPath.isJSXAttribute()) {
            write(raw);
            return;
        }
        
        if (raw) {
            const value = raw.slice(1, -1);
            write.quote();
            write(value);
            write.quote();
            
            return;
        }
        
        write.quote();
        write(value);
        write.quote();
    },
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
    Import(path, {write}) {
        write('import');
    },
    Super(path, {write}) {
        write('super');
    },
};
