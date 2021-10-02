const entries = Object.entries(window.__ABB.scheme);

export const getKey = (data: [string, string][]) => (v: string) => {
    const [key] = data.find(([, value]) => value === v) || [];
    return key;
};

export const getSchemeKey = getKey(entries);
