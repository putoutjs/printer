'use strict';

const {isPrev} = require('../../is');

module.exports.maybeDecorators = (visitor) => (path, printer, semantics, options) => {
    const {
        write,
        traverse,
        maybe,
    } = printer;
    const {decorators} = path.node;
    
    if (decorators) {
        for (const decorator of path.get('decorators')) {
            maybe.write.breakline(isPrev(path));
            traverse(decorator);
            write.breakline();
        }
    }
    
    visitor(path, printer, semantics, options);
};
