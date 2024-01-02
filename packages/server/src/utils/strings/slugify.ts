import { decamelize } from './private/decamelize';
import { transliterate } from './private/transliterate';

export const slugify = (input: string): string => {
    let string = transliterate(input);
    string = decamelize(string);
    string = string.toLowerCase();

    // Detect contractions/possessives by looking for any word followed by a `'t`
    // or `'s` in isolation and then remove it.
    string = string.replace(/([a-zA-Z\d]+)'([ts])(\s|$)/g, '$1$2$3');

    string = string.replace(/[^a-z\d/]/g, '-');
    string = string.replace(/-*\/-*/g, '/');
    string = string.replace(/\/{2,}/g, '/').replace(/^\/+|\/+$/g, '');
    string = string.replace(/-{2,}/g, '-').replace(/^-+|-+$/g, '');

    return string;
};
