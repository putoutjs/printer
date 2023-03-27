import {run} from 'madrun';

export default {
    'test': () => `tape 'test/*.js' 'lib/**/*.spec.js'`,
    'watch:test': async () => `nodemon -w lib -w test -x ${await run('test')}`,
    'fresh:lint': () => run('lint', '--fresh'),
};