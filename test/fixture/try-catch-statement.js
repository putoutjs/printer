try {
    fn();
} catch (error) {
    console.log(error);
} finally {
    console.log('done');
}

try {
    abc();
} catch {
    console.log('error');
}

list.map((a) => {
    try {
        return;
    } finally {
        return;
    }
});