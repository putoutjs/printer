const a = () => {
    return pullout(p.request)
        .then((body) => {
            onPUT({
                name: p.name,
                fs,
                moveFiles,
                config,
                body,
            }, callback);
        })
        .catch(callback);
};