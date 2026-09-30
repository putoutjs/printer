const {
    hello: {
        world: {
            a = 0,
            b = 0,
        },
    },
} = z;

const [error, {
    scripts = {},
} = {}] = tryCatch(JSON.parse, content);