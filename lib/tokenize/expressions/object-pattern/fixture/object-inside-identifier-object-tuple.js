const [name, {
    report,
    find,
    traverse,
    include,
    exclude,
    fix,
    rules,
    replace,
    filter,
    match,
    declare,
    scan,
}] = maybeEntries(plugin);

function x() {
    const [name, {
        report,
        find,
        traverse,
        include,
        exclude,
    }] = maybeEntries(plugin);
}