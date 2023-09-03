const spread = {
    ...a,
    ...b,
    ...c
};

module.exports.replace = () => ({
    'return __a === true': 'return Boolean(__a)',
    'return __a == true': 'return Boolean(__a)',
    
    'const __a = __b === true': 'const __a = __b === Boolean(__a)',
    'const __a = __b == true': 'const __a = __b == Boolean(__a)'
});