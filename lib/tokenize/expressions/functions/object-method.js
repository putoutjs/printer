'use strict';

const {isNewlineBetweenSiblings} = require('../../is');

module.exports.ObjectMethod = {
    beforeIf(path) {
        return path.node.async;
    },
    before(path, {write}) {
        write('async ');
    },
    print(path, {print}) {
        const {kind} = path.node;
        
        if (kind !== 'method')
            print(`${kind} `);
        
        print('__key');
        print('(');
        
        const params = path.get('params');
        const n = params.length - 1;
        
        for (let i = 0; i <= n; i++) {
            print(params[i]);
            
            if (i < n)
                print(', ');
        }
        
        print(') ');
        print('__body');
    },
    afterIf(path) {
        return isNewlineBetweenSiblings(path);
    },
    after(path, {print}) {
        print.linebreak();
    },
};

