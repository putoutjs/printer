'use strict';

const {join} = require('path');
const {readFileSync} = require('fs');
const tryCatch = require('try-catch');
const kebabCase = require('just-kebab-case');
const dirFixture = join(__dirname, 'fixture');
const readFixture = (name) => {
    const longName = join(dirFixture, name);
    const [e, data] = tryCatch(readFileSync, `${longName}.ts`, 'utf8');
    
    if (!e)
        return data;
    
    return readFileSync(`${longName}.js`, 'utf8');
};

module.exports.readFixtures = () => {
    return new Proxy({}, handler);
};

const handler = {
    get(obj, prop) {
        return readFixture(kebabCase(prop));
    },
};

