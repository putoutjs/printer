'use strict';

module.exports.maybeDeclare = (visit) => (path, printer, semantics) => {
    const {maybe} = printer;
    const {declare} = path.node;
    
    maybe.print(declare, 'declare ');
    visit(path, printer, semantics);
};
