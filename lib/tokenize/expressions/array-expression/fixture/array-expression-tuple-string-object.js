export default {
    'test': () => [`tape 'test/**/*.js'`, {
        SUPERTAPE_TIMEOUT,
    }],
};

const a = {
    'test': () => ['tape "test/**/*.js"', {
        SUPERTAPE_TIMEOUT,
    }],
};