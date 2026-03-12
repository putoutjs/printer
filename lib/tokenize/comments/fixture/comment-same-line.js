export const match = () => ({
    '__a ? __b : __c': (vars, path) => {
        return true; //path.parentPath.isExpressionStatement();
    },
});

const plugins = [{
    rule: 'remove-debugger',
    msg: '', // optional
}];