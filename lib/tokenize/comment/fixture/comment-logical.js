function wasModifierKeyOnlyEvent(ev) {
    return ev.keyCode === 16 || // Shift
        ev.keyCode === 17 || // Ctrl
        ev.keyCode === 18; // Alt
}