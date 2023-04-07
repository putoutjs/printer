const isBodyOfArrow = (path) => path.parentPath.node.body === path.node;

const isLogical = (path) => path.get('argument').isLogicalExpression();

const isValue = (path) => path.get('properties.0.value').node;

const isIf = (path) => path.parentPath.parentPath.isIfStatement();
