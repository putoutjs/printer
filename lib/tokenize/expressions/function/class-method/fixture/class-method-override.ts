// @ts-ignore
const foo = Symbol('foo');

// @ts-ignore
const bar = Symbol('bar');

class Base {
    [bar]() {}
}

class Derived extends Base {
    override [foo]() {}
    
    [bar]() {}
}