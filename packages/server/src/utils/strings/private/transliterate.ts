import { replacements } from './replacements';

export const transliterate = (input: string): string => {
    let normalised = input.normalize();
    for (const [pattern, value] of replacements) {
        normalised = normalised.replaceAll(pattern, value);
    }
    return normalised
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .normalize();
};
