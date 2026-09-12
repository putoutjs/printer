// https://git.io/JqcMn

import putout, {compare} from 'putout';

export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const match = () => ({
    'codeblock("json", __a)': (vars, path) => {
        const prev = path.getPrevSibling();
        return compare(prev, 'heading(2, "Configuration")');
    },
});

export const replace = () => ({
    'codeblock("json", __a)': ({__a}) => {
        const {code} = putout(toJS(extract(__a)));
        return '';
    },
});
