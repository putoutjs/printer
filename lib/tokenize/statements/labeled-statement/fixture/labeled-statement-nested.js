{
    a: b: console.log();
}
outer: for (let i = 0; i < 2; i++) {
    inner: for (let j = 0; j < 2; j++) {
        if (i + j > 2)
            break outer;
        
        continue inner;
    }
}
