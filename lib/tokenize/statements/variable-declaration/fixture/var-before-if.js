const keyPath = path.get('key');

if (keyPath.isIdentifier() && !keyPath.node.name)
    push(path);