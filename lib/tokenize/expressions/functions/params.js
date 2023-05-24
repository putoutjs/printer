'use strict';

module.exports.printParams = (path, {print}) => {
    print('(');
    
    const params = path.get('params');
    const n = params.length;
    
    for (let i = 0; i < n; i++) {
        print(params[i]);
        
        if (i < n - 1) {
            print(',');
            print.space();
        }
    }
    
    print(')');
};
