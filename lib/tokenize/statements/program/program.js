import {parseComments} from '../../comment/comment.js';
import {getDirectives} from '../block-statement/get-directives.js';
import {hasCoupleTrailingComments} from '../../is.js';

export const Program = (path, printer, semantics) => {
    const {body} = path.node;
    const {
        traverse,
        maybe,
        write,
    } = printer;
    
    traverse(path.get('interpreter'));
    parseComments(path, printer, semantics);
    
    const directives = getDirectives(path);
    
    for (const directive of directives) {
        traverse(directive);
        maybe.write.newline(body.length);
    }
    
    path.get('body').forEach(traverse);
    
    if (directives.length && !body.length)
        return;
    
    if (body.length && hasCoupleTrailingComments(body.at(-1)))
        return;
    
    write.endOfFile();
};
