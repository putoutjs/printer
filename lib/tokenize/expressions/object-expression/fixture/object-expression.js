const estreeToBabel = require('estree-to-babel');
const acorn = require('acorn');

const ast = estreeToBabel(acorn.parse(source, {
    ecmaVersion: 2023,
}));

module.exports.replace = () => ({
    'return __a === true': 'return Boolean(__a)',
    'return __a == true': 'return Boolean(__a)',
    
    'const __a = __b === true': 'const __a = __b === Boolean(__a)',
    'const __a = __b == true': 'const __a = __b == Boolean(__a)',
});

const fn = () => {
    return {
        DoWhileStatement(path) {
            const testPath = path.get('test');
            
            if (testPath.isIdentifier())
                use(testPath, testPath.node.name);
        },
        
        TemplateLiteral(path) {
            traverseTmpl(path, path.node.expressions);
        },
    };
};