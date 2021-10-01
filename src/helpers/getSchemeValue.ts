import { scheme } from "../model";

export const getValue = (data: Record<string, string>) => (key: string) => {
    return data[key];
};

export const getSchemeValue = getValue(scheme);
