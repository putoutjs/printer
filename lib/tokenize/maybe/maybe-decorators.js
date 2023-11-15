'use strict';

const isPrevClassProperty = (path) => {
    const prev = path.getPrevSibling();
    
    if (!prev.node)
        return false;
    
    return prev.isClassProperty() || prev.isClassAccessorProperty();
};

module.exports.maybeDecorators = (visitor) => (path, printer, semantics, options) => {
    const {
        write,
        traverse,
        maybe,
    } = printer;
    
    const {decorators} = path.node;
    
    if (decorators)
        for (const decorator of path.get('decorators')) {
            maybe.write.breakline(isPrevClassProperty(path));
            traverse(decorator);
            write.breakline();
        }
    
    visitor(path, printer, semantics, options);
};
