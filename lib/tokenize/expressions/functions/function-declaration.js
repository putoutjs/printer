'use strict';

const {hasPrevNewline} = require('../../mark');
const isFirst = (path) => !path.getPrevSibling().node;

module.exports.FunctionDeclaration = {
    beforeIf(path) {
        return !isFirst(path) && !hasPrevNewline(path) && !path.parentPath.isExportDeclaration();
    },
    before(path, {write}) {
        write('\n');
    },
    print(path, {print, maybe}) {
        const {async} = path.node;
        
        maybe.print(async, 'async ');
        
        print('function ');
        print('__id');
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
};

