export function createTuple(typeName) {
    const afterSplit = typeName.split(' ');
    const typeWithNot = afterSplit.pop();
    const array = typeWithNot.split('!');
    const operation = afterSplit.join(' ');
    
    if (typeWithNot === '+')
        return [
            `${operation} `,
            Boolean,
        ];
    
    if (typeWithNot === '-')
        return [
            `${operation} !`,
            Boolean,
        ];
    
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
