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
}