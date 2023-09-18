'use strict';

const {types} = require('@putout/babel');
const {isTSConditionalType} = types;

module.exports.TSMappedType = (path, {print, indent, maybe}) => {
    const {
        readonly,
        optional,
        nameType,
    } = path.node;
    
    print('{');
    print.newline();
    indent.inc();
    indent();
    
    if (readonly) {
        maybe.print(readonly === '-', '-');
        print('readonly ');
    }
    
    print('[');
    print('__typeParameter');
    
    if (nameType) {
        print(' as');
        maybe.space(!isTSConditionalType(nameType));
        print('__nameType');
    }
    
    print(']');
    
    if (optional) {
        maybe.print(optional === '+', '+');
        maybe.print(optional === '-', '-');
        print('?');
    }
    
    print(':');
    print.space();
    print('__typeAnnotation');
    print(';');
    indent.dec();
    print.breakline();
    print('}');
};
