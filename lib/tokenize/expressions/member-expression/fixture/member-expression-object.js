const b = z
    .string()
    .min(2)
    .regex(/^[a-zA-Z\-]+$/gm, {
        message: 'Only English alphabet symbols and hyphen allowed',
    });