function x() {
    if (ignores(process.cwd(), name, options))
        return [null, {
            code: source,
            places: [],
        }];
}