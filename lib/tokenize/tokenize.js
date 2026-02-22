import {traverse as babelTraverse} from '@putout/babel';
import {maybeFile} from './maybe/index.js';
import {createPrinter} from './printer/printer.js';

export const tokenize = (ast, overrides) => {
    const {getTokens, traverse} = createPrinter(overrides);
    
    if (ast.parentPath)
        pathTraverse(ast, traverse);
    else
        babelTraverse(maybeFile(ast), {
            Program(path) {
                traverse(path);
                path.stop();
            },
        });
    
    return getTokens();
};

function pathTraverse(ast, traverse) {
    ast.parentPath.traverse({
        enter(path) {
            if (path === ast) {
                traverse(path);
                path.stop();
            }
        },
    });
}
