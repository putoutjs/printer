import {types} from '@putout/babel';
import {isInsideLabel} from '#is';
import {createTypeChecker} from '#type-checker';
import {maybeSpaceAfterKeyword} from './maybe-space-after-keyword.js';
import {beforeIf} from './before-if.js';
import {afterIf} from './after-if.js';

const {isJSXElement} = types;

export const ReturnStatement = {
    beforeIf,
    before(path, {print}) {
        print.linebreak();
    },
    print(path, printer, semantics) {
        const {maybe, print} = printer;
        
        maybe.indent(!isInsideLabel(path));
        print('return');
        
        const arg = path.get('argument');
        
        maybeSpaceAfterKeyword(arg, printer, semantics);
        
        if (isJSXWithComment(path)) {
            print('(');
            print.breakline();
            print('__argument');
            print(');');
            
            return;
        }
        
        print('__argument');
        print(';');
    },
    afterIf,
    after(path, {print}) {
        print.newline();
    },
};

const isJSXWithComment = createTypeChecker([
    ['-: node.argument -> !JSXElement'],
    ['+: node.argument.leadingComments ->', Boolean],
]);

