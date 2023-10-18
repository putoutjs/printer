declare module 'core-js-pure/features/iterator' {
    export function from<T>(it: Iterable<T>): ExtendedIterator<T>;
}