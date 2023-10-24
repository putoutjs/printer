'use strict';

module.exports.TSInterfaceBody = (path, {traverse, write, indent, maybe}) => {
    const body = path.get('body');
    write.space();
    write('{');
    maybe.write.newline(body.length);
    indent.inc();
    
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
