module.exports.maybeSpace = (path, {print}) => {
    if (!path.isExpression())
        print(' ');
}