import {extend} from 'supertape';
import * as strip from '@supertape/operator-strip';
import {printExtension} from '#test/printer';
import {readFixtures} from '#test/fixture';

export const createTest = (dir) => {
    const fixture = readFixtures(dir);
    const test = extend({
        ...strip,
        print: printExtension,
    });
    
    return {
        fixture,
        test,
    };
};
