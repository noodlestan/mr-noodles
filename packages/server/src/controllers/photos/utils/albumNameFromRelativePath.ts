import slugify from 'slugify';

export const albumNameFromRelativePath = (relativePath: string): string | undefined => {
    return relativePath !== '.' ? slugify(relativePath) : undefined;
};
