function X() {
    this.changeDir = async (path, overrides = {}) => {
        Images.show.load(imgPosition, panel);
    };
    
    /**
     * Конструктор CloudClient, который
     * выполняет весь функционал по
     * инициализации
     */
    this.init = async (prefix, config) => {
        CloudCmd.route(location.hash);
    };
    
    async function loadStyle() {
        await load.css(name);
    }
    
    this.route = (path) => {
        CloudCmd.execFromModule(module, 'show');
    };
    
    this.logOut = async () => {
        unregisterSW(prefix);
    };
    
    this.refresh = async (options = {}) => {
        await CloudCmd.changeDir(path, {
            isRefresh,
            history,
            panel,
            noCurrent,
            currentName,
        });
    };
    
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
        CloudCmd.log(`reading dir: "${path}";`);
    }
}