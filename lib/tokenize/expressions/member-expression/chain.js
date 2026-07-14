import {types} from '@putout/babel';
import {hasTrailingComment} from '#is';

const {
    isCallExpression,
    isMemberExpression,
} = types;

const {assign} = Object;

const isCallee = (call, member) => {
    if (!isCallExpression(call))
        return false;
    
    return call.node.callee === member.node;
};

export const chain = (path) => {
    const all = [
        ...down(path),
        ...up(path),
    ];
    
    const properties = all.slice(0, -1);
    const root = all.at(-1);
    
    return [root, properties];
};

function down(path) {
    const properties = [];
    
    let current = path.get('object');
    
    while (!current.isIdentifier()) {
        const isFn = current.isCallExpression();
        const prop = build(current);
        
        if (isFn)
            current = current.get('callee');
        
        properties.unshift(prop);
        
        if (!current.isMemberExpression())
            break;
        
        current = current.get('object');
    }
    
    return properties;
}

function up(current) {
    const properties = [];
    
    while (current.isMemberExpression()) {
        if (hasTrailingComment(current.get('object')))
            properties.push({
                type: 'CommentLine',
            });
        
        const member = current;
        current = current.parentPath;
        
        if (isCallee(current, member)) {
            properties.push(build(current));
            current = current.parentPath;
        }
        
        if (!isMemberExpression(current))
            break;
    }
    
    properties.push({
        type: current.type,
    });
    
    return properties;
}

function build(path) {
    const {type} = path;
    const prop = {
        type,
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

