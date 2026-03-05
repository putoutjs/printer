import {types} from '@putout/babel';
import {markAfter} from '#mark';
import {isNext} from '#is';
import {parseComments} from '../../comment/comment.js';
import {getDirectives} from './get-directives.js';
import {isCallInsideChain} from './is-call-inside-chain.js';
import {shouldAddNewlineAfter} from './block-statement-newline.js';

const {
    isObjectMethod,
    isArrayExpression,
} = types;

const isFirstStatement = (path) => path.node.body[0];
const isFirstDirective = (path) => path.node.directives?.[0];

const isInsideArrayTupleOfThree = (path) => {
    const {parentPath} = path.parentPath;
    
    if (!isArrayExpression(parentPath))
        return false;
    
    const {length} = parentPath.node.elements;
    
    return length === 3;
};

export const BlockStatement = {
    print(path, printer, semantics) {
        const {trailingComma} = semantics;
        const {
            indent,
            maybe,
            write,
            traverse,
        } = printer;
        
        const body = path.get('body');
        const directives = getDirectives(path);
        
        if (path.parentPath.isBlockStatement())
            indent();
        
        const insideArray = isInsideArrayTupleOfThree(path);
        maybe.indent.inc(!insideArray);
        write('{');
        
        if (isFirstStatement(path) || isFirstDirective(path))
            write.newline();
        
        for (const directive of directives) {
            traverse(directive);
        }
        
        maybe.write.linebreak(directives.length && body.length);
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
        
        const {parentPath} = path;
        
        if (isObjectMethod(parentPath))
            maybe.write(isNext(parentPath) || trailingComma, ',');
    },
    afterIf: shouldAddNewlineAfter,
    after(path, {write}) {
        write.newline();
        markAfter(path.parentPath);
    },
};
