import {maybeParens} from '../../maybe/maybe-parens.js';

export const TSTypeQuery = maybeParens((path, {print}) => {
    print('typeof ');
    print('__exprName');
});
