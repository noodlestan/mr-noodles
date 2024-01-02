import { decamelize } from './private/decamelize';

export const cleanName = (input: string): string => {
    let string = decamelize(input);
    string = string.trim();

    string = string.replace(/-*\/-*/g, '/');
    string = string.replace(/\/{2,}/g, '/').replace(/^\/+|\/+$/g, '');
    string = string.replace(/-{2,}/g, '-').replace(/^-+|-+$/g, '');
    string = string.replace(/\s{2,}/g, ' ');
    string = string.trim();

    return string;
};
