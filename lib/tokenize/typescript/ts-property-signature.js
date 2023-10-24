'use strict';

const {maybePrintTypeAnnotation} = require('../maybe/maybe-type-annotation');

const {
    hasTrailingComment,
    isNext,
} = require('../is');

module.exports.TSPropertySignature = (path, printer) => {
    const {
        print,
        maybe,
        write,
    } = printer;
    
    const {optional, readonly} = path.node;
    
    maybe.print(readonly, 'readonly ');
    print('__key');
    maybe.print(optional, '?');
    
    maybePrintTypeAnnotation(path, printer);
    
    if (!path.parentPath.parentPath.isTSTypeParameterInstantiation()) {
        write(';');
        write.newline();
    }
    
    if (isNext(path) && hasTrailingComment(path))
        write.newline();
};
