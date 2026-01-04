export const wrongShorthand = ({computed, isAssign, keyPath, valuePath}) => {
    return !computed && !isAssign && keyPath.node.name !== valuePath.node.name;
};
