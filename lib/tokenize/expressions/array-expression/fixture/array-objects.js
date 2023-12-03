const rules = [{
    test: /\.css$/,
    exclude: /css/,
    use: extract(),
}, ...cssPlugins.map(extract), {
    test: /ttf$/,
    use: {
        loader: 'url-loader',
        options: {
            limit: 100_000,
        },
    },
}];