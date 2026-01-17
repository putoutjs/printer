import {maybeParens} from '../../maybe/maybe-parens.js';

export const TSNonNullExpression = maybeParens((path, {print}) => {
    print('__expression');
    print('!');
});
