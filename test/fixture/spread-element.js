const {errors} = {
    ...props,
};

const {errors2} = {
    ...props,
};

for (const {a, ...b} of {...c}) {}

button.addEventListener('click', () => {
    let a = {};
    
    for (const d of b) {
        a = {
            ...c,
            [d.name]: 'hello',
        };
    }
});