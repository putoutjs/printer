function getMinifyHtmlOptions() {
    return {
        removeEmptyAttributes: true,
        /* оставляем, поскольку у нас
         * в элемент fm генерируеться
         * таблица файлов
         */
        removeEmptyElements: false,
        removeOptionalTags: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        
        minifyJS: true,
    };
}