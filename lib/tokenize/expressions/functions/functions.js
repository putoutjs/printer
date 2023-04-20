'use strict';

const {ArrowFunctionExpression} = require('./arrow-function-expression');
const {FunctionDeclaration} = require('./function-declaration');
const {ClassMethod} = require('./class-method');

module.exports.ArrowFunctionExpression = ArrowFunctionExpression;
module.exports.FunctionDeclaration = FunctionDeclaration;
module.exports.ClassMethod = ClassMethod;

module.exports.FunctionExpression = (path, {print, maybe, write, traverse}) => {
    const {node} = path;
    
    const {
        generator,
        async,
    } = node;
    
    maybe.write(async, 'async ');
    write('function');
    maybe.write(generator, '*');
    
    const id = path.get('id');
    
    if (id.node) {
        write.space();
        traverse(id);
    }
    
    print('(');
    
    const params = path.get('params');
    const n = params.length;
    
    for (let i = 0; i < n; i++) {
        print(params[i]);
        
        if (i < n - 1)
            print(', ');
    }
    
    print(') ');
    print('__body');
};

module.exports.ObjectMethod = (path, {print}) => {
    const {kind} = path.node;
    
    if (kind !== 'method')
        print(`${kind} `);
    
    print('__key');
    print('(');
    
    const params = path.get('params');
    const n = params.length - 1;
    
    for (let i = 0; i <= n; i++) {
        print(params[i]);
        
        if (i < n)
            print(', ');
    }
    
    print(') ');
    print('__body');
};
