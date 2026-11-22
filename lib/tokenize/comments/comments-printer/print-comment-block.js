const isStarLine = (line) => line
    .trim()
    .startsWith('*');

const isBlank = (line) => !line.trim();

export const printCommentBlock = (value, {print, indent}, end = '') => {
    const [first, ...rest] = value.split('\n');
    
    if (!rest.length || !indent.getLevel()) {
        print(`/*${value}*/${end}`);
        return;
    }
    
    const last = rest.at(-1);
    const lines = isBlank(last) ? rest.slice(0, -1) : rest;
    
    if (!lines.every(isStarLine)) {
        print(`/*${value}*/${end}`);
        return;
    }
    
    print(`/*${first}`);
    
    for (const line of lines) {
        print.breakline();
        
        print(` ${line.trimStart()}`);
    }
    
    if (isBlank(last)) {
        print.breakline();
        
        print(' ');
    }
    
    print(`*/${end}`);
};
