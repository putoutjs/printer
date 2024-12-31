'use strict';

const {types} = require('@putout/babel');

const {markAfter} = require('../../mark');
const {exists, isNext} = require('../../is');

const {
    isBlockStatement,
    isFunctionDeclaration,
} = types;

const isInside = ({parentPath}) => !parentPath.parentPath.isProgram();
const isEmptyConsequent = (path) => path.get('consequent').isEmptyStatement();

const isInsideNestedBody = ({parentPath}) => {
    if (parentPath.type !== 'BlockStatement')
        return false;
    
    return parentPath.parentPath.type === 'BlockStatement';
};

const isInsideIf = (path) => path.parentPath.parentPath?.isIfStatement();
const isEmptyBody = (path) => !path.node.body.length;

const isLastEmptyInsideBody = (path) => {
    const {parentPath} = path;
    
    if (!isBlockStatement(parentPath))
        return false;
    
    if (!isBlockStatement(path.node.consequent))
        return false;
    
    if (path.node.consequent.body.length)
        return false;
    
    return isFunctionDeclaration(path.parentPath.parentPath);
};

module.exports.IfStatement = {
    print: (path, {indent, print, maybe, write, traverse}) => {
        const partOfAlternate = path.parentPath.get('alternate');
        
        if (path !== partOfAlternate)
            indent();
        
        print('if');
        print.space();
        print('(');
        print('__test');
        print(')');
        
        const consequent = path.get('consequent');
        const alternate = path.get('alternate');
        const isConsequentBlock = consequent.isBlockStatement();
        const isVar = consequent.isVariableDeclaration();
        
        if (isConsequentBlock) {
            print.space();
            print(consequent);
            
            if (isInsideIf(path) || isInsideNestedBody(path))
                maybe.print.newline(isEmptyBody(consequent));
        } else {
            const is = !isEmptyConsequent(path);
            
            maybe.print.newline(is);
            maybe.indent.inc(is);
            maybe.indent(isVar);
            print(consequent);
            maybe.indent.dec(is);
        }
        
        if (alternate.isBlockStatement()) {
            write.space();
            write('else');
            write.space();
            traverse(alternate);
        } else if (alternate.isIfStatement()) {
            if (alternate.get('consequent').isBlockStatement())
                write.space();
            else
                indent();
            
            write('else ');
            traverse(alternate);
        } else if (exists(alternate)) {
            maybe.write.newline(isVar);
            maybe.indent(!isConsequentBlock);
            maybe.write.space(isConsequentBlock);
            write('else');
            write.splitter();
            indent.inc();
            traverse(alternate);
            indent.dec();
        }
        
        if (!isNext(path) && !consequent.isBlockStatement())
            return;
        
        if (path === partOfAlternate && isInside(path))
            print.newline();
        
        if (isLastEmptyInsideBody(path))
            print.newline();
    },
    afterSatisfy: () => [isNext],
    after: (path, {print}) => {
        print.linebreak();
        markAfter(path);
    },
};
