'use strict';

const {isPrevBody} = require('../is');
const isBodyLength = ({parentPath}) => parentPath.node?.body?.length > 2;

module.exports.ReturnStatement = (path, {indent, write, traverse}) => {
    if (isBodyLength(path) || isPrevBody(path)) {
        write.indent();
        write.newline();
    }
    
    indent();
    write('return');
    
    const argPath = path.get('argument');
    
    if (argPath.node) {
        write(' ');
        traverse(argPath);
    }
    
    write(';');
    write.newline();
};

