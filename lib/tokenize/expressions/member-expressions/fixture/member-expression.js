const fn = () => {
    return lines
        .map(cutSpaces(spacesCount))
        .join('\n');
};

if (path.getNextSibling().isImportDeclaration())
    return false;
