function replacer(tokens, plugin) {
    const [from, to] = entries(plugin.replace());
    
    if (compare(tokens, from)) {}
}