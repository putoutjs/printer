class Foo {
    constructor(
        // @ts-ignore
        @decorator readonly foo: string
    ) {}
}