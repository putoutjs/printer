import {types} from '@putout/babel';
import {print} from '..';

const {identifier} = types;

// THROWS Argument of type 'number' is not assignable to parameter of type 'Node'
print(1);
// THROWS Type '1' has no properties in common with type 'Options'.
print(identifier('hello'), 1);

print(identifier('hello'), {
    // THROWS Object literal may only specify known properties, and 'abc' does not exist in type 'Options'.
    abc: 'hello',
});
