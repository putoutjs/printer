import {
    isNext,
    hasTrailingComment,
} from '#is';
import {maybeDecorators} from '../../maybe/maybe-decorators.js';
import {printKey} from '../object-expression/print-key.js';
import {printKind} from './kind.js';
import {printFunctionParams} from './print-function-params.js';
import {printReturnType} from './print-return-type.js';

const noTrailingCommentAndNext = (path) => {
    if (hasTrailingComment(path))
        return false;
    
    return isNext(path);
};

export const ClassMethod = {
    print: maybeDecorators((path, printer, semantics) => {
        const {print} = printer;
        const {node} = path;
        const {accessibility} = node;
        
        if (accessibility) {
            print(accessibility);
            print(' ');
        }
        
        if (node.static) {
            print('static');
            print(' ');
        }
        
        if (node.override) {
            print('override');
            print(' ');
        }
        
        if (node.async) {
            print('async');
            print(' ');
        }
        
        printKind(path, printer);
        printKey(path, printer);
        printFunctionParams(path, printer, semantics);
        printReturnType(path, printer);
        
        print.space();
        print('__body');
    }),
    afterSatisfy: () => [
        noTrailingCommentAndNext,
    ],
    after(path, {print}) {
        print.linebreak();
    },
};

export const ClassPrivateMethod = ClassMethod;
