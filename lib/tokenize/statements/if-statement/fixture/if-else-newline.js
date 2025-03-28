function getPath(name, isHTML, isJSON) {
    if (isHTML) {
        path += '.hbs';
    } else if (isJSON) {
        path = DIR_JSON + name + '.json';
    }
    
    return path;
}