type MaybePromise<T> = Promise<T> | (
    T extends any
        ? Promise<T>
        : never
);