import {markAfter} from '#mark';
import {createTypeChecker} from '#type-checker';
import {isInsideBlock} from '#is';
import {parseComments} from '#comments';
import {getDirectives} from './get-directives.js';
import {isCallInsideChain} from './is-call-inside-chain.js';
import {shouldAddNewlineAfter} from './block-statement-newline.js';

const isThree = (a) => a === 3;

const isInsideArrayTupleOfThree = createTypeChecker([
    ['-: parentPath.parentPath -> !ArrayExpression'],
    ['+: parentPath.parentPath.node.elements.length', isThree],
]);

const hasDirectives = (a) => getDirectives(a).length;

const isNewLineAfterOpenCurlyBrace = createTypeChecker([
    ['+', hasDirectives],
    ['+: node.body.length -> +'],
]);

const isLinebreakAfterDirectives = createTypeChecker([
    ['-: node.body.length -> -'],
    ['+', hasDirectives],
]);

export const BlockStatement = {
    beforeIf: isInsideBlock,
    before: (path, {indent}) => {
        indent();
    },
    print(path, printer, semantics) {
        const {
            indent,
            maybe,
            write,
            traverse,
        } = printer;
        
        const body = path.get('body');
        const directives = getDirectives(path);
        const insideArray = isInsideArrayTupleOfThree(path);
        
        maybe.indent.inc(!insideArray);
        write('{');
        
        if (isNewLineAfterOpenCurlyBrace(path))
            write.newline();
        
        for (const directive of directives) {
            traverse(directive);
        }
        
        if (isLinebreakAfterDirectives(path))
            write.linebreak();
        
        const callInsideChain = isCallInsideChain(path);
        
        maybe.indent.inc(callInsideChain);
        
        for (const element of body) {
            traverse(element);
        }
        
        parseComments(path, printer, semantics);
        
        indent.dec();
        
        maybe.indent(body.length);
        maybe.indent.inc(insideArray);
        write('}');
        
        maybe.indent.dec(callInsideChain);
    },
    afterIf: shouldAddNewlineAfter,
    after(path, {write}) {
        write.newline();
        markAfter(path.parentPath);
    },
};
