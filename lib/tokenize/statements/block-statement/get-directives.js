export const getDirectives = (path) => !path.node.directives ? [] : path.get('directives');
