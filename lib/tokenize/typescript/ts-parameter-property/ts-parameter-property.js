import {hasLeadingComment} from '../../is.js';

export const TSParameterProperty = (path, {print, maybe, indent}) => {
    const {
        decorators,
        readonly,
        accessibility,
    } = path.node;
    
    const decoratorsLength = decorators?.length > 1;
    
    maybe.print.breakline(decoratorsLength);
    
    if (decorators) {
        for (const decorator of path.get('decorators')) {
            maybe.indent(decoratorsLength);
            print(decorator);
        }
        
        maybe.print.breakline(decoratorsLength);
        
        if (!hasLeadingComment(path))
            indent();
        else
            print(' ');
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

TSParameterProperty.printLeadingCommentLine = (path, printer, semantics, {printComment}) => {
    const {indent, print} = printer;
    
    if (path.node.decorators) {
        printComment();
        print.breakline();
        
        return;
    }
    
    if (path.parentPath.isClassMethod()) {
        indent.inc();
        print.breakline();
        
        printComment();
        print.breakline();
        indent.dec();
        
        return;
    }
};
