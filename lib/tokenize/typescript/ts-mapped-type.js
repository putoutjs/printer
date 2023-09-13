'use strict';

module.exports.TSMappedType = (path, {print, write, indent, maybe}) => {
    const {readonly, optional} = path.node;
    
    write('{');
    write.newline();
    indent.inc();
    indent();
    
    if (readonly) {
        maybe.write(readonly === '-', '-');
        write('readonly ');
    }
    
    write('[');
    print('__typeParameter');
    write(']');
    
    if (optional) {
        maybe.write(optional === '+', '+');
        maybe.write(optional === '-', '-');
        write('?');
    }
    
    write(':');
    write.space();
    print('__typeAnnotation');
    write(';');
    indent.dec();
    write.breakline();
    write('}');
};
