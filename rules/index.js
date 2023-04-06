'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('apply-breakline'),
    ...getRule('apply-computed-print'),
    ...getRule('add-args'),
};
