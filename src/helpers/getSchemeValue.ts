export const getValue = (data: Record<string, string>) => (key: string) => {
    return data[key];
};

export const getSchemeValue = getValue(window.__ABB.scheme);
