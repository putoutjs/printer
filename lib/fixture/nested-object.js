__putout_processor_json({
    "rules": {
        "nodejs/declare": "off",
    },
    "match": {
        "{test,debug.js}": {
            "remove-console": "off",
        },
        "lib/**/*.js": {
            "tape/add-args": ["on", {
                "args": {
                    "path": ["path", "module.exports.__a = () => __body"],
                    "maybe": ["{maybe}", [
                        "module.exports.__a = (path, __object) => __body",
                        "module.exports.__a = (path) => __body",
                    ]],
                    "print": ["{print}", [
                        "module.exports.__a = (path, __object) => __body",
                        "module.exports.__a = (path) => __body",
                    ]],
                    "indent": ["{indent}", [
                        "module.exports.__a = (path, __object) => __body",
                        "module.exports.__a = (path) => __body",
                    ]],
                    "compute": ["{compute}", [
                        "module.exports.__a = (path, __object) => __body",
                        "module.exports.__a = (path) => __body",
                        "function __() {}",
                    ]],
                },
            }],
        },
    },
});