async function transformAsync(ast, source, opts) {
    return places;
}

// why we pass 'source' to 'transform()'?
// because we need to calculate position in a right way
// and determine is shebang is exists
//
// 25     return {¬
// 26         line: shebang ? line + 1 : line,¬
// 27         column,¬
// 28     };¬
//
module.exports.transform = transform;