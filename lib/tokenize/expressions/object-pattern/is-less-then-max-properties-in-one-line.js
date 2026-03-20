import {createTypeChecker} from '#type-checker';

const getMaxPropertiesInOneLine = (a, {maxPropertiesInOneLine}) => maxPropertiesInOneLine;

export const isLessThenMaxPropertiesInOneLine = createTypeChecker([
    ['+: node.properties.length', '<=', getMaxPropertiesInOneLine],
]);
