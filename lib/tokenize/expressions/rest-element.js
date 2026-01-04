import {maybeTypeAnnotation} from '../maybe/maybe-type-annotation.js';

export const RestElement = maybeTypeAnnotation((path, {print}) => {
    print('...');
    print('__argument');
});
