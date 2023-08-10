const onDisconnect = ((conNum) => {
    logClients('remove before:', Clients);
    
    if (Clients.length !== conNum + 1) {
        Clients[conNum] = null;
    } else {
        Clients.pop();
        --ConNum;
    }
    
    logClients('remove after:', Clients);
    
    log(conNum, 'console disconnected');
    
    socket.removeListener('command', onMessage);
    socket.removeListener('disconnect', onDisconnect);
}).bind(null, ConNum);