'use strict';

module.exports.maybePrintTypeAnnotation = maybePrintTypeAnnotation;

module.exports.maybeTypeAnnotation = (visit) => (path, printer, semantics) => {
    visit(path, printer, semantics);
    
    maybePrintTypeAnnotation(path, printer);
};

function maybePrintTypeAnnotation(path, printer) {
    const {typeAnnotation} = path.node;
    const {write, traverse} = printer;
    
    if (typeAnnotation) {
        write(':');
        write.space();
        traverse(path.get('typeAnnotation'));
    }
}
