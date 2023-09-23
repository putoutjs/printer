'use strict';

const {isPrev} = require('../../is');

module.exports.maybePrintDecorators = (path, printer) => {
    const {print, maybe} = printer;
    const {decorators} = path.node;
    
    if (decorators) {
        for (const decorator of path.get('decorators')) {
            maybe.print.breakline(isPrev(path));
            print(decorator);
            print.breakline();
        }
    }
};
