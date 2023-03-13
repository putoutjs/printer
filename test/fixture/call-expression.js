module.exports.traverse = ({push}) => ({
    VariableDeclarator() {
        push({
            path,
            bindingPath,
            initName: init.name,
            idName: id.name,
        });
    },
});
