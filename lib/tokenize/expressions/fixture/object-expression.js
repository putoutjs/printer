const estreeToBabel = require("estree-to-babel");
const acorn = require("acorn");

const ast = estreeToBabel(acorn.parse(source, {
    ecmaVersion: 2023,
}));

module.exports.replace = () => ({
    'return __a === true': 'return Boolean(__a)',
    'return __a == true': 'return Boolean(__a)',
    
    'const __a = __b === true': 'const __a = __b === Boolean(__a)',
    'const __a = __b == true': 'const __a = __b == Boolean(__a)',
    
    '__a = __b === true': '__a = __b === Boolean(__a)',
    '__a = __b == true': '__a = __b == Boolean(__a)',
    
    '__a === true': '__a',
    '__a === false': '!__a',
    
    '__a == true': '__a',
    '__a == false': '!__a',
    
    '__a !== true': '!__a',
    '__a != true': '!__a',
});