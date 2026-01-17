import {maybeParens} from '#maybe-parens';

export const TSTypeQuery = maybeParens((path, {print}) => {
    print('typeof ');
    print('__exprName');
});
