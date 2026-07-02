import {createTypeChecker} from '#type-checker';

// THROWS Expected 1-2 arguments, but got 3.
createTypeChecker([], {}, {});

// THROWS Expected 1-2 arguments, but got 0.
createTypeChecker();

// THROWS Argument of type 'number' is not assignable to parameter of type 'unknown[]'.
createTypeChecker(1);

const isBlockLike = createTypeChecker(['Program', 'BlockStatement']);

// THROWS Argument of type 'boolean' is not assignable to parameter of type 'Record<string, unknown>'
isBlockLike({type: 'Program'}, true);

// THROWS Argument of type 'number' is not assignable to parameter of type 'Record<string, unknown>'
isBlockLike({type: 'Program'}, 1);
