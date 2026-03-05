import {run} from 'madrun';

const env = {
    TYPE_CHECK: 1,
};

export default {
    'wisdom': () => run(['lint', 'coverage', 'test:dts']),
    'test': () => `tape 'lib/**/*.spec.js' test/*.js 'rules/**/*.spec.js'`,
    'test:check': () => [env, `tape 'lib/**/*.spec.js' test/*.js 'rules/**/*.spec.js'`],
    'test:dts': () => 'check-dts test/*.ts',
    'watch:test': async () => [env, `nodemon -w lib -w test -x "${await run('test')}"`],
    'lint': () => run('lint:*'),
    'lint:redlint': () => 'redlint fix',
    'lint:putout': () => 'putout .',
    'fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('fix:lint:*'),
    'fix:lint:redlint': () => 'redlint fix',
    'fix:lint:putout': () => run('lint:putout', '--fix'),
    'coverage': async () => [env, `c8 ${await run('test')}`],
    'coverage:html': async () => [env, `c8 --reporter=lcov ${await run('test')}`],
    'report': () => 'c8 report --reporter=lcov',
};

