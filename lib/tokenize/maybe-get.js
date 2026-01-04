export const maybeDecorators = (path) => {
    if (!path.node.decorators)
        return [];
    
    return path.get('decorators');
};
