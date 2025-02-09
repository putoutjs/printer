'use strict';

const {hasLeadingComment} = require('../../is');

module.exports.TSParameterProperty = (path, {print, maybe, indent}) => {
    const {
        decorators,
        readonly,
        accessibility,
    } = path.node;
    
    const decoratorsLength = decorators?.length > 1;
    const isNewline = decoratorsLength || hasLeadingComment(path);
    
    maybe.print.breakline(decoratorsLength);
    
    if (decorators) {
        for (const decorator of path.get('decorators')) {
            maybe.indent(decoratorsLength);
            print(decorator);
        }
        
        maybe.print.breakline(decoratorsLength);
        
        if (isNewline)
            indent();
        
        if (!hasLeadingComment(path))
            print.space();
    }
    
    if (accessibility) {
        print(accessibility);
        print.space();
    }
    
    if (readonly) {
        print('readonly');
        print.space();
    }
    
    print('__parameter');
    
    if (hasLeadingComment(path) && !path.node.decorators)
        print.breakline();
};
module.exports.TSParameterProperty.printLeadingCommentLine = (path, printer, semantics, {printComment}) => {
    const {indent, print} = printer;
    
    if (path.parentPath.isClassMethod() && !path.node.decorators) {
        indent.inc();
        print.breakline();
        
        printComment();
        print.breakline();
        indent.dec();
    }
};
