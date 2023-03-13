'use strict';

module.exports = {
    NumericLiteral(path, {write}) {
        write(path.node.value);
    },
    StringLiteral(path, {write}) {
        write(`'${path.node.value}'`);
    },
    Identifier(path, {write}) {
        write(path.node.name);
    },
};

