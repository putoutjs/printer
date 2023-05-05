export const fix = (path) => {
    path.remove();
};

export function globalPreload({port}) {
    port.onmessage = createFileEntry;
    return montag`
        global.__createC4 = port.postMessage.bind(port);
    `;
}

export async function load(url, context, defaultLoad) {}