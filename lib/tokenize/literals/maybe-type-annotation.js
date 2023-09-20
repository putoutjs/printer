'use strict';

module.exports.maybeTypeAnnotation = (visit) => (path, printer, semantics) => {
    const {typeAnnotation} = path.node;
    const {print} = printer;
    
    visit(path, printer, semantics);
    
    if (typeAnnotation) {
        print(':');
        print.space();
        print('__typeAnnotation');
    }
};
