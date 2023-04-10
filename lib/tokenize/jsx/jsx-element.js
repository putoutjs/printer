'use strict';

module.exports.JSXElement = {
    condition,
    before(path, {write, indent}) {
        write('(');
        write.breakline();
        indent();
        indent.inc();
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
    return path.parentPath.isReturnStatement();
}
