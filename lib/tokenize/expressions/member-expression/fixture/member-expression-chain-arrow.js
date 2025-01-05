const parseRule = (rule) => rule
    .replace('import:@putout/plugin-', '')
    .replace('@putout/plugin-', '');