import {markBefore} from '#mark';

export {TemplateLiteral} from './template-literal.js';
export {Identifier} from './identifier.js';
export {Decorator} from './decorator/decorator.js';
export {StringLiteral} from './string-literal/string-literal.js';
export {DirectiveLiteral} from './directive-literal.js';
export {VoidPattern} from './void-pattern/void-pattern.js';
export {RegExpLiteral} from './regexp-literal/regexp-literal.js';

export const BigIntLiteral = (path, {write}) => {
    write(path.node.raw);
};

export const NumericLiteral = (path, {write}) => {
    const {
        raw,
        extra,
        value,
    } = path.node;
    
    write(raw || extra?.raw || value);
};

export const Directive = (path, {print}) => {
    print('__value');
};

const maybeHeaderBreak = (path, print) => {
    if (path.parentPath.isProgram() && !path.getPrevSibling().node)
        print.newline();
};

Directive.printLeadingCommentLine = (path, printer, semantics, {printComment}) => {
    const {print, indent} = printer;
    
    indent();
    printComment();
    print.newline();
    maybeHeaderBreak(path, print);
};

Directive.printLeadingCommentBlock = (path, printer, semantics, {printComment}) => {
    const {print, indent} = printer;
    
    indent();
    printComment();
    markBefore(path);
    maybeHeaderBreak(path, print);
};

export const BooleanLiteral = (path, {write}) => {
    write(path.node.value);
};

export const NullLiteral = (path, {write}) => {
    write('null');
};

export const MetaProperty = (path, {print}) => {
    print('__meta');
    print('.');
    print('__property');
};

export const Super = (path, {write}) => {
    write('super');
};
