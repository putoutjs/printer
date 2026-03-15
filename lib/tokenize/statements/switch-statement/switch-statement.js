import {types} from '@putout/babel';
import {
    isNext,
    exists,
    isLast,
} from '#is';
import {parseLeadingComments} from '#comments';
import {createTypeChecker} from '#type-checker';
import {maybeSpaceAfterKeyword} from '../return-statement/maybe-space-after-keyword.js';

const {isBlockStatement} = types;

export const SwitchStatement = {
    print(path, printer, semantics) {
        const {
            print,
            maybe,
            indent,
            traverse,
        } = printer;
        
        indent();
        print('switch');
        print('(');
        print('__discriminant');
        print(')');
        print.space();
        print('{');
        print.newline();
        
        const cases = path.get('cases');
        const n = cases.length - 1;
        
        for (const [index, switchCase] of cases.entries()) {
            const test = switchCase.get('test');
            const isLast = index === n;
            
            indent();
            
            parseLeadingComments(switchCase, printer, semantics);
            
            if (exists(test)) {
                print('case');
                maybeSpaceAfterKeyword(test, printer, semantics);
                traverse(test);
            } else {
                print('default');
            }
            
            print(':');
            
            if (isNewlineAfterColon(switchCase))
                print.newline();
            
            const consequents = switchCase.get('consequent');
            const [first] = consequents;
            const isBlock = isBlockStatement(first);
            
            maybe.indent.inc(!isBlock);
            
            for (const consequent of consequents) {
                if (isBlockStatement(consequent))
                    print.space();
                
                print(consequent);
            }
            
            maybe.indent.dec(!isBlock);
            maybe.print.linebreak(!isLast);
        }
        
        print.indent();
        print('}');
        
        if (isNewlineAfterClosingCurlyBrace(path))
            print.newline();
    },
    afterSatisfy: () => [
        isNext,
    ],
    after(path, {print}) {
        print.breakline();
        print.newline();
    },
};

const isNewlineAfterClosingCurlyBrace = createTypeChecker([
    ['-', isNext],
    ['+: -> !', isLast],
]);

const isNewlineAfterColon = createTypeChecker([
    '-: node.consequent.length -> -',
    '+: node.consequent.0 -> !BlockStatement',
]);

