export function x(a) {
    b: {
        l: while (true) {
            if (i32.eqz(local.get(a))) {
                break b;
            }
            
            continue l;
        }
        i32.const(1);
    }
}