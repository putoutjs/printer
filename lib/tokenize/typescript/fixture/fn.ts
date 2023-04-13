type oldType = {};

const y = (): Promise<oldType[]> => {
    // @ts-ignore
    return Promise.resolve({});
};