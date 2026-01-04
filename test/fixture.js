import {join} from 'node:path';
import {readFileSync} from 'node:fs';
import {tryCatch} from 'try-catch';
import kebabCase from 'just-kebab-case';

const readFixture = (dir, name) => {
    const dirFixture = join(dir, 'fixture');
    const longName = join(dirFixture, name);
    const [e, data] = tryCatch(readFileSync, `${longName}.ts`, 'utf8');
    
    if (!e)
        return data;
    
    return readFileSync(`${longName}.js`, 'utf8');
};

export const readFixtures = (dir) => {
    return new Proxy({}, createHandler(dir));
};

const createHandler = (dir) => ({
    get(obj, prop) {
        return readFixture(dir, kebabCase(prop));
    },
});
