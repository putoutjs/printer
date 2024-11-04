type FirstString<T> =
    T extends [infer S extends string, ...unknown[]]
        ? S
        : never;