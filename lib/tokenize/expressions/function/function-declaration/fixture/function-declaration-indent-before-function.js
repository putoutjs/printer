function X() {
    /**
     * Функция загружает json-данные о Файловой Системе
     * через ajax-запрос.
     * @param path - каталог для чтения
     * @param options
     * { refresh, history } - необходимость обновить данные о каталоге
     * @param panel
     *
     */
    async function ajaxLoad(path, options = {}, panel) {
        Storage.setJson(path, newObj);
    }
    
    /**
     * Функция строит файловую таблицу
     * @param data - данные о файлах
     * @param panelParam
     * @param options - history, noCurrent, showDotFiles
     */
    async function createFileTable(data, panelParam, options) {
        CloudCmd.emit('active-dir', Info.dirPath);
    }
}