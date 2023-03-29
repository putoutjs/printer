'use strict';

const {hasPrevNewline} = require('../mark');
const isFirst = (path) => !path.getPrevSibling().node;

module.exports.FunctionExpression = (path, {print, maybe}) => {
    const {node} = path;
    
    const {
        generator,
        async,
    } = node;
    
    maybe.print(async, 'async ');
    print('function');
    maybe.print(generator, '*');
    print(' (');
    
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

module.exports.ArrowFunctionExpression = ArrowFunctionExpression;

function ArrowFunctionExpression(path, {print, maybe}) {
    const {async} = path.node;
    maybe.print(async, 'async ');
    print('(');
    
    const params = path.get('params');
    const n = params.length;
    
    for (let i = 0; i < n; i++) {
        print(params[i]);
        
        if (i < n - 1)
            print(', ');
    }
    
    print(') => ');
    print('__body');
}
module.exports.ObjectMethod = (path, {print}) => {
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

module.exports.FunctionDeclaration = (path, {print, maybe}) => {
    const {async} = path.node;
    
    if (!isFirst(path) && !hasPrevNewline(path) && !path.parentPath.isExportDeclaration())
        print('\n');
    
    maybe.print(async, 'async ');
    print('function ');
    print('__id');
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

module.exports.ClassMethod = (path, {print}) => {
    print('__key');
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
