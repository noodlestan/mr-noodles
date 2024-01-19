import md5 from 'md5';

export const generateId = (value: string): string => {
    if (!value) {
        throw new Error('Can not generate id from empty string');
    }
    return md5(value);
};
