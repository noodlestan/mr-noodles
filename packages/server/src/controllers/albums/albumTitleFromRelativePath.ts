import { cleanName } from '../../utils/strings/cleanName';

export const albumTitleFromRelativePath = (relativePath: string): string => {
    return cleanName(relativePath);
};
