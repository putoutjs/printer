declare module './observable' {
    interface Observable<T> {
        map<U>(f: (x: T) => U): Observable<U>;
    }
}