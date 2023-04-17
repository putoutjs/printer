'use strict';

const {satisfy} = require('../is');

module.exports = (plugin) => {
    if (!plugin.afterSatisfy && !plugin.beforeSatisfy)
        return plugin;
    
    return {
        afterIf: createIf(plugin.afterSatisfy),
        beforeIf: createIf(plugin.beforeSatisfy),
        ...plugin,
    };
};

const createIf = (getConditions) => {
    const conditions = getConditions?.() || [];
    return satisfy(conditions);
};
