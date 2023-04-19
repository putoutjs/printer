'use strict';

module.exports.JSXFragment = {
    condition,
    before(path, {write, indent}) {
        write('(');
        indent.inc();
        write.breakline();
    },
    print(path, {print, traverse}) {
        print('__openingFragment');
        path.get('children').map(traverse);
        print('__closingFragment');
    },
    after(path, {write, indent}) {
        indent.dec();
        write.breakline();
        write(')');
    },
};

module.exports.JSXOpeningFragment = (path, {write}) => {
    write('<>');
};

module.exports.JSXClosingFragment = (path, {write}) => {
    write('</>');
};

function condition(path) {
    if (path.parentPath.isReturnStatement())
        return true;
    
    return path.parentPath.isVariableDeclarator();
}
