// @ts-ignore
const foo = Symbol('foo');

// @ts-ignore
const bar = Symbol('bar');

class Base {
    [bar]() {}
}

class Derived extends Base {
    override [foo]() {}
    //       ~~~~~
    // error: This member cannot have an 'override' modifier because it is not declared in the base class 'Base'.
    [bar]() {}
    // ~~~~~
    // error under noImplicitOverride: This member must have an 'override' modifier because it overrides a member in the base class 'Base'.
}