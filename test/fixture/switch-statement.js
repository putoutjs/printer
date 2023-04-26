switch (a) {
case 'world':
    log('world');
    break;
    
case 'hello': {
    const name = 'hello';
    log(name);
    
    break;
}
}

switch (value.type) {
case 'Identifier':
    declare(path, value.name);
    break;
    
case 'AssignmentPattern':
    if (path.node.shorthand)
        declare(path, key.name);
    else
        declare(path, valuePath.node.left.name);
    
    break;
}