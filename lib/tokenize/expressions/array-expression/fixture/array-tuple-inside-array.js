__putout_processor_filesystem([
    "/",
    "/hello.txt",
    [
        "/world.txt",
        "hello world"
    ],
    "/world.txt"
]);

__putout_processor_filesystem([
    "/",
    "/hello.txt",
    "/a",
    [
        "/world.txt",
        "hello world"
    ]
]);