import slugify from 'slugify';

const SLUG_OPTIONS = {
    lower: true,
    strict: false,
};

export const makeSlug = (path: string): string => {
    return slugify(path.replace(/[/_]/g, '-'), SLUG_OPTIONS);
};

export const albumNameFromRelativePath = (relativePath: string): string | undefined => {
    return relativePath !== '.' ? makeSlug(relativePath) : undefined;
};
