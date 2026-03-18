__putout_processor_filesystem([
    "/",
    "/hello.txt",
    ["/world.txt", "hello world"],
    "/world.txt"
]);

__putout_processor_filesystem([
    "/",
    "/hello.txt",
    "/a",
    ["/world.txt", "hello world"]
]);

const args = {
    path: ["vars, path", [
        "(__a) => __body",
        "() => __body"
    ]]
};

__putout_processor_filesystem([
    "/",
    ["/package.json", "e30K"]
]);