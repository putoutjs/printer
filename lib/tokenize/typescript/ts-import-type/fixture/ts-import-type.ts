// @ts-ignore
type A = import('./ts-import-type.ts', {
    with: {
        type: 'json',
    },
});
// @ts-ignore
type B = import('hello');