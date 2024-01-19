import type { FolderNoodle } from '@noodlestan/shared-types';

export const searchByParent = (items: FolderNoodle[], parent: string): FolderNoodle[] => {
    const parentIndex = (parent && parent.split('/').length) || 0;
    return items.filter(folder => {
        const isSubFolder = folder.filename.startsWith(parent || '');
        const slugLevel = folder.filename.split('/').length;
        return isSubFolder && slugLevel === parentIndex + 1;
    });
};

export const searchItems = (items: FolderNoodle[], search: string): FolderNoodle[] => {
    return items.filter(folder => {
        const { title } = folder;
        return title?.includes(search);
    });
};
