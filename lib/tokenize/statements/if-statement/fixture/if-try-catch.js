function fn() {
    if (a)
        try {} catch {}
    else if (s)
        x();
}

function fn2() {
    if (a)
        while (a) {}
    else
        x();
}