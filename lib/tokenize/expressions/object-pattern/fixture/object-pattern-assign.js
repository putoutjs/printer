const {hello} = y, {world = 0} = hello;

function getStubs(stubs = {}) {
    const {
        formatter = new EventEmitter(),
        count = stub().returns(1),
        incCount = stub(),
        incPassed = stub(),
        incFailed = stub(),
        incAssertionsCount = stub(),
        isEnded = stub(),
        extensions = {},
    } = stubs;
    
    return {
        formatter,
        count,
        incCount,
        incPassed,
        incFailed,
        isEnded,
        incAssertionsCount,
        extensions,
    };
}

const {
    writeFileSync = writeFileSyncOriginal,
    mkdirSync = mkdirSyncOriginal,
} = overrides;