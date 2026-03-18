export const isNextAssignObject = callWithNext(createTypeChecker([
    '-: node -> -',
    '-: node.value -> !AssignmentPattern',
    '+: node.value.right -> ObjectExpression',
]));

for (const [index, value] of Object.entries(['a', 'b', 'c'])) {
    console.log(index === 1); // never true
}