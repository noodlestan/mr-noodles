import path from 'path';

export const makeFilenameFromIdAndHeight = (id: string, height: number): string => {
    const parts = [id.substring(0, 2), id.substring(2, 4), id.substring(4, 6), id.substring(6)];
    const target = path.join(...parts) + `.thumb.${height}.jpg`;
    return target;
};
