export const RegExpLiteral = (path, {print}) => {
    const {raw, pattern} = path.node;
    print(raw || `/${pattern}/`);
};
