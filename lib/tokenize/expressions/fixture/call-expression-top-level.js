import {test} from 'supertape';
import {call, callArgs} from './couple.js';

test('name: call', (t) => {
    const result = call('fn');
    t.calledWithNoArgs(fn);
    t.end();
});

test('name: callArgs', (t) => {
    const result = callArgs('fn');
    const expected = [];
    t.calledWith(fn, expected);
    t.end();
});