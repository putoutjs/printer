import {maybePrintComputed} from './maybe-print-computed.js';

export const printKey = (path, printer) => {
    const key = path.get('key');
    
    maybePrintComputed(path, key, printer);
};
