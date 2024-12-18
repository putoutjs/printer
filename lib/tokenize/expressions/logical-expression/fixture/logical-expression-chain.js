const isIndent = isFirst(path)
    || !looksLikeSwitchCase
    && !path.isClassMethod()
    && !insideFn
    && !propIs;