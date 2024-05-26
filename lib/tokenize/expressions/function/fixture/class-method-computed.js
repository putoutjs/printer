const a = {
    name: 'key',
};

class B {
    get [a.name]() {
        return 10;
    }
    
    [a.name]() {
        return 10;
    }
}

console.log(new B().key());