LABEL1: while (true) {
    console.log(42);
    break LABEL1;
}
LABEL2: for (let i = 0; i < 5; i++) {
    console.log(42);
    continue LABEL2;
}
