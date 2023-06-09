t.report('object', ['Avoid using duplicates in Union']);

function getTopArrayType(path) {
    let i = 1;
    let prevPath;
    
    return [i, prevPath];
}

export default {
    'wisdom': () => run(['lint', 'coverage']),
};

const maybeArray = (a) => isArray(a) ? a : [a];