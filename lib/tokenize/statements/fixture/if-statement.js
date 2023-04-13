(function() {
    return (function() {
        if (x === 2) {
            return 2;
        } else {
            return 3;
        }
    })(), x += 1;
})();