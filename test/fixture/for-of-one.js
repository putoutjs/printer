for (const a of b)
    hello(a);

const x = 5;

for (const {hello} of [{hello: 'world'}])
    alert(hello);

for (const a of []) {
    console.log('hello world');
}