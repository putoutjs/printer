const {O = 1, RAW} = process.env;
const {name = 'ishvara.wast', type} = options;
const {
    loc = {
        line: 0,
    },
    id,
} = error;

const {
    id1,
    loc1 = {
        line: 0,
    },
} = error;

const fn = (overrides = {}) => {
    const {
        code,
        e = {},
    } = overrides;
    
    return create(code || e);
};