import { slugify } from '../../utils/strings/slugify';

export const albumSlugFromRelativePath = (relativePath: string): string => {
    return relativePath !== '.' ? slugify(relativePath) : '';
};
