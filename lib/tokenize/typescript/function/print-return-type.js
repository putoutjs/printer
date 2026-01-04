export const hasReturnType = (path) => path.node.returnType;

export const printReturnType = (path, {traverse}) => {
    traverse(path.get('returnType'));
};
