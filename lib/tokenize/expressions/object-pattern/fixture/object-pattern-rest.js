const {...rest} = useform();

const {
    formState: {
        errors,
    },
    ...a
} = useformContext();

const {
    register,
    formState: {
        errors2,
    },
    ...b
} = useformContext();

const {
    comments = [],
    tokens,
    ...program
} = node;