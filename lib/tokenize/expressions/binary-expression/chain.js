'use strict';

const {
    isReturnStatement,
    isVariableDeclarator,
} = require('@putout/babel').types;

module.exports.isRootOk = (path) => {
    return isReturnStatement(path) || isVariableDeclarator(path);
};

module.exports.chain = (path) => {
    const [downCount] = down(path);
    const [upCount, root] = up(path);
    
    return [root, downCount + upCount, downCount, upCount];
};

function down(path) {
    let current = path;
    let count = 0;
    
    do {
        ++count;
        current = current.get('left');
        const {operator} = current.node;
        
        if (operator !== '||' && operator !== '&&')
            break;
    } while (current.isLogicalExpression());
    
    return [count];
}

function up(current) {
    let count = 0;
    
    do {
        ++count;
        current = current.parentPath;
    } while(current.isLogicalExpression());
    
    return [count, {
        type: current.type,
    }];
}

