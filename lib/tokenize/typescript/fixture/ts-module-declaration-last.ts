export const x = 6;

declare namespace test {
    export var only: typeof test;
    export var skip: typeof test;
}