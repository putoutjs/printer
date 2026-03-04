export function createTuple(typeName) {
    const afterSplit = typeName.split(' ');
    const typeWithNot = afterSplit.pop();
    const array = typeWithNot.split('!');
    const operation = afterSplit.join(' ');
    
    if (array.length === 1)
        return [
            `${operation} `,
            typeWithNot,
        ];
    
    return [
        `${operation} !`,
        array[1],
    ];
}
