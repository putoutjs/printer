function getIconName(name) {
    return 'icon-' + name
        .replace(/[()]/g, '')
        .replace(/\s/g, '-')
        .toLowerCase();
}