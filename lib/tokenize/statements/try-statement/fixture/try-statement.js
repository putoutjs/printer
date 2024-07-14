try {
    throw 0;
} catch {
    console.log('it failed, but this code executes');
}

try {
    fn();
} catch(error) {
    console.log(error);
}