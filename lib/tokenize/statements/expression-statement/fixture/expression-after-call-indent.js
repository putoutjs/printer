if (a) {
    DOM.setTitle({
        name,
        path,
    });
    
    // hello
    m();
}

if (path !== pathWas) {
    DOM.setTitle(getTitle({
        name,
        path,
    }));
    
    /* history could be present
     * but it should be false
     * to prevent default behavior
     */
    if (!o || o.history) {
        const historyPath = path === '/' ? path : FS + path;
        DOM.setHistory(historyPath, null, historyPath);
    }
}