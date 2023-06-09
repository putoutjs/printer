const lines = text
    .split('\n')
    .slice(1);

const currentSource = list
    .shift()
    .trim();

const line = rawSource.split('\n')[startLine];

module.exports.isFirst = (path) => path.node === path.parentPath.node.body?.[0];

const isBodyOfArrow = (path) => path.parentPath.node.body === path.node;
const isLogical = (path) => path.get('argument').isLogicalExpression();
const isValue = (path) => path.get('properties.0.value').node;
const isIf = (path) => path.parentPath.parentPath.isIfStatement();