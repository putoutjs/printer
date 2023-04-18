for (const a of b)
    hello(a);

const x = 5;

for (const {hello} of [{hello: 'world'}])
    alert(hello);

for (const a of []) {
    console.log('hello world');
}

const satisfy = () => {
    for (const condition of conditions)
        if (condition(path))
            return true;
    
    return false;
};