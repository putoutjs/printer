const {...rest} = useform();

const {
    formState: {
        errors,
    },
    ...a
} = useformContext();