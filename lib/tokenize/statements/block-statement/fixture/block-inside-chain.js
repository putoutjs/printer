function copy(from, to, names, fn) {
    copymitter(from, to, names)
        .on('error', fn)
        .on('progress', (count) => {
            process.stdout.write(`\r copy ${from} ${to} ${count}%`);
        })
        .on('end', () => {
            process.stdout.write('\n');
            fn();
        });
}