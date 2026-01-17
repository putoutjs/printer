import {maybeParens} from '#maybe-parens';
import {maybeDecorators} from '../maybe-get.js';
import {maybeTypeAnnotation} from '../maybe/maybe-type-annotation.js';

export const Identifier = maybeParens(maybeTypeAnnotation((path, printer) => {
    const {
        write,
        maybe,
        traverse,
        print,
    } = printer;
    
    const {node} = path;
    const {name, optional} = node;
    
    for (const decorator of maybeDecorators(path)) {
        traverse(decorator);
        print(' ');
    }
    
    write(name);
    maybe.write(optional, '?');
}));
