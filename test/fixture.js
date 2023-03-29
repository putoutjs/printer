'use strict';

const {join} = require('path');
const {readFileSync} = require('fs');
const tryCatch = require('try-catch');
const kebabCase = require('just-kebab-case');

const readFixture = (dir, name) => {
    const dirFixture = join(dir, 'fixture');
    const longName = join(dirFixture, name);
    const [e, data] = tryCatch(readFileSync, `${longName}.ts`, 'utf8');
    
    if (!e)
        return data;
    
    return readFileSync(`${longName}.js`, 'utf8');
};

module.exports.readFixtures = (dir) => {
    return new Proxy({}, createHandler(dir));
};

function createHandler(dir) {
    return {
        get(obj, prop) {
            return readFixture(dir, kebabCase(prop));
        },
    };
}
