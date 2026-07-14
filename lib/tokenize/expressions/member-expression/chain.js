import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {hasTrailingComment} from '#is';

const {
    isCallExpression,
    isMemberExpression,
} = types;

const {assign} = Object;

export const chain = (path) => {
    const properties = [
        ...down(path),
        ...up(path),
    ];
    
    const root = properties.pop();
    
    return [root, properties];
};

function down(path) {
    const properties = [];
    
    let current = path.get('object');
    
    while (!current.isIdentifier()) {
        properties.unshift(buildProperty(current));
        current = stepIntoCallee(current);
        
        if (!current.isMemberExpression())
            break;
        
        current = current.get('object');
    }
    
    return properties;
}

function stepIntoCallee(current) {
    if (current.isCallExpression())
        return current.get('callee');
    
    return current;
}

function up(current) {
    const properties = [];
    
    while (current.isMemberExpression()) {
        if (hasTrailingComment(current.get('object')))
            properties.push(commentProperty());
        
        current = stepOutOfChain(current, properties);
        
        if (!isMemberExpression(current))
            break;
    }
    
    properties.push(rootProperty(current));
    
    return properties;
}

function stepOutOfChain(member, properties) {
    const parent = member.parentPath;
    
    if (!isMemberOwnCallee(member))
        return parent;
    
    properties.push(buildProperty(parent));
    
    return parent.parentPath;
}

function isPathOwnCallee({node, parentPath}) {
    return node === parentPath.node.callee;
}

const isMemberOwnCallee = createTypeChecker([
    ['-: parentPath -> !CallExpression'],
    ['+', isPathOwnCallee],
]);

function buildProperty(path) {
    const prop = {
        type: path.type,
    };
    
    if (isCallExpression(path)) {
        const {callee} = path.node;
        
        assign(prop, {
            args: path.node.arguments.length,
        });
        
        if (isMemberExpression(callee))
            assign(prop, {
                name: callee.property.name,
            });
    }
    
    return prop;
}

const commentProperty = () => ({
    type: 'CommentLine',
});

const rootProperty = (path) => ({
    type: path.type,
});
