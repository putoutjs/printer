import {types} from '@putout/babel';

const {
    isLogicalExpression,
    isReturnStatement,
    isVariableDeclarator,
} = types;

export const isRootOk = (path) => {
    return isReturnStatement(path) || isVariableDeclarator(path);
};

export const chain = (path) => {
    const [downCount] = down(path);
    const [upCount, root] = up(path);
    
    return [
        root,
        downCount + upCount,
        downCount,
        upCount,
    ];
};

function down(current) {
    let count = 0;
    
    do {
        ++count;
        const right = current.get('right');
        
        if (isLogicalExpression(right))
            count += down(right)[0];
        
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
    } while (current.isLogicalExpression());
    
    return [
        count, {
            type: current.type,
        },
    ];
}
