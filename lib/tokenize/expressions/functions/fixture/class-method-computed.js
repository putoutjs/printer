const a = {
    name: "key",
};

class B {
    [a.name]() {
        return 10;
    }
}

console.log(new B().key());