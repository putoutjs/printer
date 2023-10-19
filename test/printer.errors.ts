import {print} from '..';
import {types} from '@putout/babel';

const {identifier} = types;

// THROWS Argument of type 'number' is not assignable to parameter of type 'Node'
print(1);
// THROWS Type '1' has no properties in common with type 'Options'.
print(identifier('hello'), 1);

print(identifier('hello'), {
    // THROWS Argument of type '{ abc: string; }' is not assignable to parameter of type 'Options'.
    abc: 'hello',
});
