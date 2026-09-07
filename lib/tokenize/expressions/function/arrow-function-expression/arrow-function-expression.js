import {exists} from '#is';
import {maybeParens} from '#maybe-parens';
import {printParams} from '#print-params';
import {printReturnType} from '../return-type.js';

export const ArrowFunctionExpression = maybeParens((path, printer, semantics) => {
    const {
        print,
        maybe,
        write,
        traverse,
    } = printer;
    
    const {async} = path.node;
    
    maybe.print(async, 'async ');
    printParams(path, printer, semantics);
    printReturnType(path, printer);
    
    print.space();
    print('=>');
    
    const body = path.get('body');
    
    const isJSX = body.isJSXElement();
    
    maybe.print.space(!isJSX);
    
    print('__body');
});
