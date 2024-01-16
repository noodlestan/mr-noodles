import { cleanName } from '../../../utils/strings/cleanName';

export const folderTitleFromRelativePath = (relativePath: string): string => {
    return cleanName(relativePath);
};
