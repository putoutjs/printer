'use strict';

module.exports.maybeInsideFn = (insideFn, {print, indent}) => {
    if (!insideFn)
        return;
    
    indent.inc();
    indent.inc();
    print.breakline();
    indent.dec();
    indent.dec();
};
