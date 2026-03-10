import {
    isNewlineBetweenSiblings,
    isNext,
} from '#is';
import {printParams} from '#print-params';
import {markAfter} from '#mark';
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
        const {trailingComma} = semantics;
        const {print} = printer;
        
        printKind(path, printer);
        printKey(path, printer);
        printParams(path, printer, semantics);
        
        print.space();
        print('__body');
        
        if (isNext(path) || trailingComma)
            print(',');
        
        print.newline();
        markAfter(path);
    },
    afterIf(path) {
        return isNewlineBetweenSiblings(path);
    },
    after(path, {print}) {
        print.linebreak();
    },
};
