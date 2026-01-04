export {TemplateLiteral} from './template-literal.js';
export {Identifier} from './identifier.js';
export {Decorator} from './decorator/decorator.js';
export {StringLiteral} from './string-literal.js';
export {DirectiveLiteral} from './directive-literal.js';
export {VoidPattern} from './void-pattern/void-pattern.js';
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

export const Directive = (path, {print, maybe}) => {
    maybe.print.breakline(path.node.leadingComments?.length);
    print('__value');
};

export const BooleanLiteral = (path, {write}) => {
    write(path.node.value);
};

export const RegExpLiteral = (path, {print}) => {
    const {raw, pattern} = path.node;
    print(raw || `/${pattern}/`);
};

export const NullLiteral = (path, {write}) => {
    write('null');
};

export const MetaProperty = (path, {write}) => {
    write('import.meta');
};

export const Super = (path, {write}) => {
    write('super');
};
