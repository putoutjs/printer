import {parseComments} from '../../comment/comment.js';

export const TSInterfaceBody = (path, printer, semantics) => {
    const body = path.get('body');
    const {
        traverse,
        write,
        indent,
        maybe,
    } = printer;
    
    write.space();
    write('{');
    
    maybe.write.newline(hasNoLeadingComments(path));
    indent.inc();
    
    parseComments(path, printer, semantics);
    
    for (const [index, item] of body.entries()) {
        if (index || !item.node.leadingComments)
            indent();
        
        traverse(item);
    }
    
    indent.dec();
    indent();
    
    write('}');
    maybe.write.newline(findTSModuleBlock(path));
};

function hasNoLeadingComments(path) {
    const {body} = path.node;
    
    if (!body.length)
        return false;
    
    const [first] = body;
    const {leadingComments} = first;
    
    return !leadingComments;
}

function findTSModuleBlock(path) {
    if (path.parentPath.parentPath.isTSModuleBlock())
        return true;
    
    return path.parentPath.parentPath.parentPath?.isTSModuleBlock();
}
