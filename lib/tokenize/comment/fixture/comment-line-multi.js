async function transformAsync(ast, source, opts) {
    return places;
}

// why we pass 'source' to 'transform()'?
// because we need to calculate position in a right way
// and determine is shebang is exists
//
// 25     return {¬
// 26         line: shebang ? line + 1 : line,¬
// 27         column,¬
// 28     };¬
//
module.exports.transform = transform;

const {isEnabled, mergeRules} = require('../rules');

// Would be great to have ability to filter
// disabled plugins and prevent them from loading
// but we can't because of a way multi-rule plugins
// works. We can't determine count and names of all
// rules of a plugin before load.
module.exports.filterEnabledPlugins = ({plugins, cookedRules}) => {};