'use strict';

module.exports = (plugin) => {
    if (!plugin.afterSatisfy && !plugin.beforeSatisfy)
        return plugin;
    
    return {
        afterIf: createIf(plugin.afterSatisfy),
        beforeIf: createIf(plugin.beforeSatisfy),
        ...plugin,
    };
};

const createIf = (getConditions) => (path) => {
    const conditions = getConditions?.() || [];
    
    for (const condition of conditions) {
        if (condition(path))
            return true;
    }
    
    return false;
};
