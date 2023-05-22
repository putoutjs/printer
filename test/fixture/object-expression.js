'use strict';

module.exports.report = () => `Unexpected 'debugger' statement`;

module.exports.replace = () => ({
    debugger: '',
});

({
    code,
    map,
});

__putout_processor_json({
    'jobs': {
        'build': {
            'runs-on': 'ubuntu-latest',
            'strategy': {
                'matrix': {
                    'node-version': ['16.x', '18.x', '19.x'],
                },
            },
        },
    },
});

__putout_processor_json({
    'jobs': {
        'build': {
            'runs-on': 'ubuntu-latest',
            'steps': [{
                'uses': 'EndBug/add-and-commit@v9',
            }],
        },
    },
});

test('should pass', (t) => {
    t.pass('ok');
    t.end();
}, {
    checkAssertionsCount: false,
    checkMore: true,
});