'use strict';

module.exports = {
    NumericLiteral(path, {write}) {
        write(path.node.value);
    },
    StringLiteral(path, {write}) {
        const {value} = path.node;
        write(`'${value}'`);
    },
    TemplateLiteral(path, {write}) {
        write('`');
        
        for (const element of path.node.quasis) {
            write(element.value.raw);
        }
        
        write('`');
    },
    Identifier(path, {write}) {
        write(path.node.name);
    },
};

