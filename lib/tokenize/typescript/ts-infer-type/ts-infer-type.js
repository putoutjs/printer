import {maybeParens} from '../../maybe/maybe-parens.js';

export const TSInferType = maybeParens((path, {print}) => {
    print('infer ');
    print('__typeParameter');
});
