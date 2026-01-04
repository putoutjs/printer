export const DirectiveLiteral = (path, {write}) => {
    write.indent();
    write(path.node.raw || `'${path.node.value}'`);
    write(';');
    write.newline();
};
