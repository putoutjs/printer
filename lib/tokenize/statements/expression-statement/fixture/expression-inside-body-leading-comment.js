for (a of b) {
    // hello
    c = 5;
    continue;
}

if (error) {
    // @ts-ignore
    expect(error.message).toMatch('No package name provided in package.json');
}