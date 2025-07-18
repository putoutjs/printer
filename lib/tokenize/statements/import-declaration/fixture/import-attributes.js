import json from './foo.json' with {
    type: 'json',
    hello: 'world',
};

import('./foo.json', {
    with: {
        type: 'json',
    },
});