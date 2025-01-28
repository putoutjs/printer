'use strict';

const {hasTrailingComment} = require('../../is');
const {assign} = Object;

module.exports.chain = (path) => {
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
        
        current = current.parentPath;
        
        if (current.isCallExpression()) {
            properties.push(build(current));
            current = current.parentPath;
        }
        
        if (!current.isMemberExpression())
            break;
    }
    
    properties.push({
        type: current.type,
    });
    
    return properties;
}

function build(path) {
    const prop = {
        type: path.type,
    };
    
    if (path.isCallExpression())
        assign(prop, {
            args: path.node.arguments.length,
            name: path.node.callee.property?.name || '',
        });
    
    return prop;
}
