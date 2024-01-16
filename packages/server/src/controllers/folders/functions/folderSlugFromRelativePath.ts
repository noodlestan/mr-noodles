import { slugify } from '../../../utils/strings/slugify';

export const folderSlugFromRelativePath = (relativePath: string): string => {
    return relativePath !== '.' ? slugify(relativePath) : '';
};
