async function switchKey(event) {
    switch(keyCode) {
    /* navigation on file table:        *
     * in case of pressing button 'up', *
     * select previous row              */
    case KEY.UP:
        if (shift)
            DOM.toggleSelectedFile(current);
        
        DOM.setCurrentFile(prev);
        event.preventDefault();
        break;
    
    /* in case of pressing button 'down', *
     * select next row                    */
    case KEY.DOWN:
        if (shift)
            DOM.toggleSelectedFile(current);
        
        DOM.setCurrentFile(next);
        event.preventDefault();
        break;
    
    /* in case of pressing button 'Home',  *
     * go to top element                   */
    case KEY.HOME:
        DOM.setCurrentFile(Info.first);
        event.preventDefault();
        break;
    
    /* in case of pressing button 'End', select last element */
    case KEY.END:
        DOM.setCurrentFile(Info.last);
        event.preventDefault();
        break;
    
    /* если нажали клавишу page down проматываем экран */
    case KEY.PAGE_DOWN:
        break;
    
    /* если нажали клавишу page up проматываем экран */
    case KEY.PAGE_UP:
        DOM.scrollByPages(panel, -1);
        
        for (i = 0; i < 30; i++) {
            if (!current.previousSibling)
                break;
            
            current = current.previousSibling;
        }
        
        DOM.setCurrentFile(current);
        event.preventDefault();
        break;
    
    /**
     * обновляем страницу,
     * загружаем содержимое каталога
     * при этом данные берём всегда с
     * сервера, а не из кэша
     * (обновляем кэш)
     */
    case KEY.R:
        break;
    
    /* чистим хранилище */
    case KEY.D:
        break;
    }
}