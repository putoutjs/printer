'use strict';

const {parseComments} = require('../../comment/comment');

module.exports.TSInterfaceBody = (path, printer, semantics) => {
    const body = path.get('body');
    const {
        traverse,
        write,
        indent,
        maybe,
    } = printer;
    
    write.space();
    write('{');
    maybe.write.newline(body.length);
    indent.inc();
    
    parseComments(path, printer, semantics);
    
    for (const item of body) {
        indent();
        traverse(item);
    }
    
    indent.dec();
    indent();
    write('}');
    maybe.write.newline(findTSModuleBlock(path));
};

function findTSModuleBlock(path) {
    if (path.parentPath.parentPath.isTSModuleBlock())
        return true;
    
    return path.parentPath.parentPath.parentPath?.isTSModuleBlock();
}
