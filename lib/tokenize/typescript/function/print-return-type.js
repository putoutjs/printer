'use strict';

module.exports.hasReturnType = (path) => path.node.returnType;

module.exports.printReturnType = (path, {traverse}) => {
    traverse(path.get('returnType'));
};
