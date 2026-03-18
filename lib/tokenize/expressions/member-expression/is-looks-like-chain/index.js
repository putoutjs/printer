import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {chain} from '../chain.js';
import {checkCallsCount} from './check-calls-count.js';

const hasPropertyWithComment = (properties) => {
    return properties.find(hasComment);
};

const isPathGet = ([property]) => {
    return isCallExpression(property, {
        name: 'get',
    });
};

const {
    isIfStatement,
    isCallExpression,
} = types;

const isPathFirstArg = ({node, parentPath}) => {
    const [first] = parentPath.node.arguments;
    return node === first;
};

function isPathLastArg({node, parentPath}) {
    const last = parentPath.node.arguments.at(-1);
    return node === last;
}

const isFirstArgOfCall = createTypeChecker([
    ['-: parentPath -> !CallExpression'],
    ['+', isPathFirstArg],
]);

const isLastArgInCall = createTypeChecker([
    ['-: parentPath -> !CallExpression'],
    ['+', isPathLastArg],
]);

const callWithRoot = (fn) => (a, {root}) => fn(root);
const isExcludedFromChain = createTypeChecker([
    '+: -> UnaryExpression',
    '+: -> IfStatement',
]);

const hasComment = ({type}) => type === 'CommentLine';

const isInsideMemberCall = createTypeChecker([
    ['-: node.object -> !Identifier'],
    ['-: node.property -> !Identifier'],
    ['+', isLastArgInCall],
    ['+: parentPath.parentPath -> CallExpression'],
]);

const callWithProperties = (fn) => (a, {properties}) => fn(properties);
const isFindUpIf = (path) => path.find(isIfUp);

export const isLooksLikeChain = (path) => {
    const [root, properties] = chain(path);
    
    return isLikeChain(path, {
        root,
        properties,
    });
};

const isLikeChain = createTypeChecker([
    ['-', isInsideMemberCall],
    ['-', callWithRoot(isExcludedFromChain)],
    ['-', callWithProperties(isPathGet)],
    ['+', callWithProperties(hasPropertyWithComment)],
    ['-', isFindUpIf],
    ['-', isFirstArgOfCall],
    ['+', checkCallsCount],
]);

const isIfUp = (path) => {
    const ifPath = path.find(isIfStatement);
    let is = false;
    
    if (!ifPath)
        return is;
    
    ifPath.get('test').traverse({
        MemberExpression(currentPath) {
            if (path === currentPath) {
                is = true;
                path.stop();
            }
        },
    });
    
    return is;
};

