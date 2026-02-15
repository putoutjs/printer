function a() {
    try {} finally {}
    
    return 6;
}

function b() {
    try {
        fn();
    } finally {
        log();
    }
    
    return 6;
}