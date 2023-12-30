export type ImageFile = {
    w: number;
    h: number;
    f: string;
    p: string;
};

type IMAGE_FIT = 'contain' | 'cover' | 'fill' | 'inside' | 'outside';

export type ImageProfile = {
    name: string;
    fit: IMAGE_FIT;
    width?: number;
    height: number;
};
