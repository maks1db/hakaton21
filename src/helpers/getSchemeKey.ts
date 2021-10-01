import { scheme } from "../model";

const entries = Object.entries(scheme);

export const getKey = (data: [string, string][]) => (v: string) => {
    const [key] = data.find(([, value]) => value === v) || [];
    return key;
};

export const getSchemeKey = getKey(entries);
