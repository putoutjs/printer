import {run, cutEnv} from 'madrun';

const env = {};

export default {
    'wisdom': () => run(['lint', 'coverage', 'test:dts']),
    'test': () => [env, `tape 'lib/**/*.spec.js' test/*.js 'rules/**/*.spec.js'`],
    'test:dts': () => 'check-dts test/*.ts',
    'watch:test': async () => [env, `nodemon -w lib -w test -x ${await cutEnv('test')}`],
    'lint': () => run('lint:*'),
    'lint:redlint': () => 'redlint scan',
    'lint:putout': () => 'putout .',
    'fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('fix:lint:*'),
    'fix:lint:redlint': () => 'redlint fix',
    'fix:lint:putout': () => run('lint:putout', '--fix'),
    'coverage': async () => [env, `c8 ${await cutEnv('test')}`],
    'coverage:html': async () => [env, `c8 --reporter=lcov ${await cutEnv('test')}`],
    'report': () => 'c8 report --reporter=lcov',
};
