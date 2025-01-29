'use strict';

const {isInsideLabel} = require('../../is');

module.exports.ContinueStatement = (path, {print, maybe, write}) => {
    const {label} = path.node;
    
    maybe.indent(!isInsideLabel(path));
    print('continue');
    
    maybe.print.space(label);
    print('__label');
    
    write(';');
    print.newline();
};
