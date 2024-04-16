if (isUpdate())
    if (!noChange && fix)
        await update(outputName, processedSource);
    else if (noChange)
        await remove(outputName);