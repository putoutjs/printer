for (const path of paths) {
    if (isBlockStatement(path))
        continue;
    
    const {node} = path;
    path.replaceWith(BlockStatement([node]));
}
