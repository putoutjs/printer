import {createTypeChecker} from '#type-checker';
import {printParams} from '#params';
import {markAfter} from '#mark';
import {printReturnType} from '#return-type';
import {
    isNext,
    callWithNext,
    hasLeadingComment,
    hasTrailingComment,
} from '#is';
import {printPropertyLeadingCommentLine} from '../../../comments/comments-printer/property-comments.js';
import {isLinebreakAfterProperty} from '../../object-expression/linebreak.js';
import {printKey} from '../../object-expression/print-key.js';
import {printKind} from '../kind.js';

const isNewlineAfterMethod = createTypeChecker([
    ['-', hasTrailingComment],
    ['-', callWithNext(hasLeadingComment)],
    ['+: -> ObjectMethod'],
]);

export const ObjectMethod = {
    beforeIf(path) {
        return path.node.async;
    },
    before(path, {write}) {
        write('async ');
    },
    print(path, printer, semantics) {
        const {trailingComma} = semantics;
        const {print, maybe} = printer;
        
        printKind(path, printer);
        printKey(path, printer);
        printParams(path, printer, semantics);
        printReturnType(path, printer);
        
        print.space();
        print('__body');
        
        if (isNext(path) || trailingComma)
            print(',');
        
        maybe.print.newline(isNewlineAfterMethod(path));
        markAfter(path);
    },
    afterIf(path) {
        return isLinebreakAfterProperty(path);
    },
    after(path, {print}) {
        print.linebreak();
    },
};

ObjectMethod.printLeadingCommentLine = printPropertyLeadingCommentLine;
