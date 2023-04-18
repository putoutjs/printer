if (lang === 'json') {
    const code = list.shift();
    node.value = fromJS(code).slice(0, -1);
}