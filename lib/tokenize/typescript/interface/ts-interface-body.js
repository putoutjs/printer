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
        write(';');
        write.newline();
    }
    
    indent.dec();
    indent();
    write('}');
    maybe.write.newline(path.parentPath.parentPath.isTSModuleBlock());
};
