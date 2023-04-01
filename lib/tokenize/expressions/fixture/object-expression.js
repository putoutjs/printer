const estreeToBabel = require("estree-to-babel");
const acorn = require("acorn");

const ast = estreeToBabel(acorn.parse(source, {
    ecmaVersion: 2023,
}));