type oldType = {
    a: number;
    b: string;
};

export type newType = oldType;

const x: newType = {
    a: 5,
    b: 'hello',
};