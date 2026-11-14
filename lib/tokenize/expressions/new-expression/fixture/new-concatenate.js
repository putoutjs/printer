new Foo(
    a +
    b,
);

new Foo(
    'x',
    a +
    b,
);

throw new Error(
    'a ' +
    `b ${c} ` +
    'd',
);

new Foo(a + b);