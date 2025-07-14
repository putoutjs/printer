async function* gen() {
    do {
        const path = new Path(entry, {
            zipfile,
        });
        
        yield path;
        
        if (path.isStop())
            return;
        
        zipfile.readEntry();
        
        [entry] = await Promise.race([
            events.once(zipfile, 'entry'),
            superOnce(zipfile, 'end'),
        ]);
    } while (entry)
}