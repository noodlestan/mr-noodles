import path from 'path';

export const makeImageFilename = (id: string, profile: string): string => {
    const parts = [id.substring(0, 2), id.substring(2, 4), id.substring(4, 6), id.substring(6)];
    const target = path.join(...parts) + `.img.${profile}.jpg`;
    return target;
};
