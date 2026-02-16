import {types} from '@putout/babel';
import {
    print,
    maybeVisitor,
    visitors,
} from '../lib/printer.js';

const {identifier} = types;

// THROWS Expected 4 arguments, but got 1.
maybeVisitor(1);

// THROWS Argument of type 'number' is not assignable to parameter of type 'Visitor'
maybeVisitor(1, 2, 3, 4);

// THROWS Argument of type 'number' is not assignable to parameter of type 'Print'.
const a = maybeVisitor(visitors.ArrayExpression, 2, 3, 4);

// THROWS Type 'void' is not assignable to type 'string'
const b: string = a;

// THROWS Argument of type 'number' is not assignable to parameter of type 'Node'
print(1);
// THROWS Type '1' has no properties in common with type 'Options'.
print(identifier('hello'), 1);

print(identifier('hello'), {
    // THROWS Object literal may only specify known properties, and 'abc' does not exist in type 'Options'.
    abc: 'hello',
});
