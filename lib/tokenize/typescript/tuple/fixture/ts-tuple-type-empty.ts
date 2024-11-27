const fn = <A, B>(a: A, b: B) => a && b;
const a = fn<number, [
    [],
]>(1, [[]]);