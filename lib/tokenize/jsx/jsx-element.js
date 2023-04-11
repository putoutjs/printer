'use strict';

module.exports.JSXElement = {
    condition,
    before(path, {write, indent}) {
        write('(');
        indent.inc();
        write.breakline();
    },
    print(path, {print, traverse}) {
        print('__openingElement');
        path.get('children').map(traverse);
        print('__closingElement');
    },
    after(path, {write, indent}) {
        indent.dec();
        write.breakline();
        write(')');
    },
};

function condition(path) {
    if (path.parentPath.isReturnStatement())
        return true;
    
    return path.parentPath.isVariableDeclarator();
}
