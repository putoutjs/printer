import {isNext} from '#is';
import {maybeDeclare} from '../../maybe/maybe-declare.js';

export const TSModuleDeclaration = {
    print: maybeDeclare((path, {print}) => {
        const {kind} = path.node;
        const id = path.get('id');
        
        if (id.isStringLiteral())
            print('module ');
        else if (kind === 'namespace')
            print('namespace ');
        
        print('__id');
        print.space();
        print('__body');
    }),
    afterSatisfy: () => [isNext],
    after(path, {print}) {
        print.newline();
        print.newline();
    },
};

export const TSModuleBlock = (path, {print, traverse, indent}) => {
    print('{');
    print.breakline();
    indent.inc();
    
    for (const child of path.get('body')) {
        traverse(child);
    }
    
    indent.dec();
    print('}');
};
