class X {
    deviceStatus(params: IParams) {
        switch(params.params[0]) {
        case 5:
            this._coreService.triggerDataEvent(`${C0.ESC}[0n`);
            break;
        
        case 6:
            // cursor position
            const y = this._activeBuffer.y + 1;
            const x = this._activeBuffer.x + 1;
            this._coreService.triggerDataEvent(`${C0.ESC}[${y};${x}R`);
            break;
        }
        
        return true;
    }
}