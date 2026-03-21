import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {
    isFirstArgOfCall,
    isLastArgInCall,
} from '#is';
import {chain} from '../chain.js';
import {checkCallsCount} from './check-calls-count.js';

const {isIfStatement} = types;

const hasPropertyWithComment = (properties) => properties.find(hasComment);
const callWithRoot = (fn) => (a, {root}) => fn(root);
const hasComment = ({type}) => type === 'CommentLine';

const isPathGet = createTypeChecker([
    ['-: 0 -> !CallExpression'],
    ['-: 0.name -> !', '=', 'get'],
    ['+: 0.args ->', '=', 1],
]);

const isExcludedFromChain = createTypeChecker([
    '+: -> UnaryExpression',
    '+: -> IfStatement',
]);

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
