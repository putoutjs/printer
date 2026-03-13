export const traverse = ({push}) => ({
    Function(path) {
        const paramsPaths = path.get('params').filter(isIdentifier);
        
        const params = new Set();
        
        for (const param of paramsPaths) {
            const {name} = param.node;
            
            if (params.has(name)) {
                push(param);
                continue;
            }
            
            params.add(name);
        }
    },
});