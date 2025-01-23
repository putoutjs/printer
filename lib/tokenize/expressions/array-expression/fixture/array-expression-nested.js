__putout_processor_filesystem([
    "/",
    ["/create-test.js", "require('./send.js');"],
    ["/send.js", "require('./1.js'); module.exports = 'hello'"],
    ["/1.js", "module.exports = '1'"]
]);