export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const fix = () => {
    path.remove();
};

export const traverse = ({push}) => ({
    'TSTypeParameterDeclaration': push,
    'TSTypeAnnotation': push,
});