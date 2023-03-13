'use strict';

module.exports.VariableDeclaration = (path, {indent, write, maybeWrite, traverse}) => {
    indent();
    write(`${path.node.kind} `);
    traverse(path.get('declarations.0.id'));
    write(' = ');
    traverse(path.get('declarations.0.init'));
    write(';\n');
    maybeWrite(isCoupleLinesExpression(path), '\n');
};
function isCoupleLinesExpression(path) {
    const start = path.node.loc?.start.line;
    const end = path.node.loc?.end.line;
    
    return end > start;
}
