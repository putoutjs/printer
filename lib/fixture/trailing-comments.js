// debugger; alert(); -> alert();
module.exports.replace = () => ({
    debugger: '',
});

// some traverse
traverse(ast, {
    noScope: false,
    ObjectProperty(path) {
        console.log(`variable is "${path.node.value.name}"`);
        // output
        'hello';
    },
});

print(ast);
// returns
`hello`;

console.log(pathStore());
// returns
[];