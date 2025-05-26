const traverse = ({push}) => {
    return {
        ObjectExpression(path) {
            push(path);
        }
    };
};