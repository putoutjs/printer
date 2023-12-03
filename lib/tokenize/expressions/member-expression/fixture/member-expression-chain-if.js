if (res.status === 404)
    return res
        .text()
        .then(reject);