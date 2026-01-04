import {satisfy} from '../is.js';

export default (plugin) => {
    if (!plugin.afterSatisfy && !plugin.beforeSatisfy && !plugin.satisfy)
        return plugin;
    
    const {
        satisfy,
        afterSatisfy = satisfy,
        beforeSatisfy = satisfy,
    } = plugin;
    
    return {
        afterIf: createIf(afterSatisfy),
        beforeIf: createIf(beforeSatisfy),
        ...plugin,
    };
};

const createIf = (getConditions) => {
    const conditions = getConditions?.() || [];
    return satisfy(conditions);
};
