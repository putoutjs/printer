'use strict';

module.exports.ContinueStatement = (path, {indent, print, maybe, write}) => {
    const {label} = path.node;
    
    indent();
    print('continue');
    
    maybe.print.space(label);
    print('__label');
    
    write(';');
    print.newline();
};
