'use strict';

const isBabel7 = (path) => path.node.typeAnnotation;

module.exports.hasReturnType = (path) => {
    if (isBabel7(path))
        return path.node.typeAnnotation;
    
    return path.node.returnType;
};

module.exports.printReturnType = (path, {print, traverse}) => {
    if (isBabel7(path)) {
        traverse(path.get('typeAnnotation'));
        return;
    }
    
    traverse(path.get('returnType'));
};
