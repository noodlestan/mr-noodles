import path from 'path';

export const makeFilenameFromId = (id: string): string => {
    const parts = [id.substring(0, 2), id.substring(2, 4), id.substring(4, 6), id.substring(6)];
    const target = path.join(...parts) + '.jpg';
    return target;
};
