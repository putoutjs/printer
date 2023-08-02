'use strict';

module.exports.hasReturnType = (path) => {
    return Boolean(path.node.returnType || path.node.typeAnnotation);
};

module.exports.printReturnType = (path, {print, traverse}) => {
    if (path.node.returnType) {
        traverse(path.get('returnType'));
        return;
    }
    
    traverse(path.get('typeAnnotation'));
};
