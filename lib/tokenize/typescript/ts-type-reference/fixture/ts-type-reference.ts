type T = string;

function* g() {
    const x = 1;
    const y = <T>(yield x);
}