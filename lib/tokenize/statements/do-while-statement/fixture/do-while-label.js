b: {
    l: do {
        if (i32.eqz(local.get(a))) {
            break b;
        }
        
        continue l;
    } while (true);
}