const fn = () => {
    return lines
        .map(cutSpaces(spacesCount))
        .join('\n');
};