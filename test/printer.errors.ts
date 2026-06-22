import {types} from '@putout/babel';
import {
    print,
    maybeVisitor,
    visitors,
    type Format,
    type Semantics,
    type Options,
    type Visitors,
    type Visitor,
    type Printer,
} from '../lib/printer.js';

const {identifier} = types;

// THROWS Expected 4 arguments, but got 1.
maybeVisitor(1);

// THROWS Argument of type 'number' is not assignable to parameter of type 'Visitor'
maybeVisitor(1, 2, 3, 4);
// THROWS Argument of type 'number' is not assignable to parameter of type 'Node'
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

// Check Format type is exported as type
// THROWS Type 'number' is not assignable to type 'Format'
const format: Format = 1;

// Check Semantics type is exported as type
// THROWS Type 'number' is not assignable to type 'Semantics'
const semantics: Semantics = 1;

// Check Options type is exported as type
// THROWS Type '1' has no properties in common with type 'Options'
const opts: Options = 1;

// Check Visitor type is exported as type
// THROWS Type 'number' is not assignable to type 'Visitor'
const visitor: Visitor = 1;

// Check Printer type is exported as type
// THROWS Type 'number' is not assignable to type 'Printer'
const printer: Printer = 1;

// Check Visitors type is exported as type
// THROWS Type 'number' is not assignable to type 'Visitors'
const vt: Visitors = 1;

