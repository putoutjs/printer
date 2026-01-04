import {isNewlineBetweenSiblings} from '../../is.js';
import {printParams} from './params.js';
import {printKey} from '../object-expression/print-key.js';
import {printKind} from './kind.js';

export const ObjectMethod = {
    beforeIf(path) {
        return path.node.async;
    },
    before(path, {write}) {
        write('async ');
    },
    print(path, printer, semantics) {
        const {print} = printer;
        
        printKind(path, printer);
        printKey(path, printer);
        printParams(path, printer, semantics);
        
        print.space();
        print('__body');
    },
    afterIf(path) {
        return isNewlineBetweenSiblings(path);
    },
    after(path, {print}) {
        print.linebreak();
    },
};
