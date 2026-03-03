export const createTypeChecker = (deepness, typeNames) => {
    if (!typeNames) {
        typeNames = deepness;
        deepness = '';
    }
    
    return (path) => {
        let i = deepness.split('.').length;
        
        while (--i)
            path = path?.parentPath;
        
        if (!path)
            return false;
        
        const {type} = path;
        
        for (const typeName of typeNames) {
            if (type === typeName)
                return true;
        }
        
        return false;
    };
};

