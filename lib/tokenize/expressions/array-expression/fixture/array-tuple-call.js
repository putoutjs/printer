if (packagePath)
    return [
        dirname(packagePath), {
            ...options,
            ...require(packagePath).putout,
        },
    ];