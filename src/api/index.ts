const { json, url } = window.__ABB;

export const getFromSource = (): Promise<any[]>  => {
    if (url) {
        return fetch(url).then((r) => r.json());
    }

    return new Promise((resolve) => {
        // @ts-ignore
        resolve(json);
    });
};
