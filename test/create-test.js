'use strict';

const {extend} = require('supertape');
const {printExtension} = require('#test/printer');
const {readFixtures} = require('#test/fixture');

module.exports.createTest = (dir) => {
    const fixture = readFixtures(dir);
    const test = extend({
        print: printExtension,
    });
    
    return {
        fixture,
        test,
    };
};
