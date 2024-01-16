import { FolderModel } from '@noodlestan/shared-types';

export const searchByParent = (items: FolderModel[], parent: string): FolderModel[] => {
    const parentIndex = (parent && parent.split('/').length) || 0;
    return items.filter(folder => {
        const isSubFolder = folder.filename.startsWith(parent || '');
        const slugLevel = folder.filename.split('/').length;
        return isSubFolder && slugLevel === parentIndex + 1;
    });
};

export const searchItems = (items: FolderModel[], search: string): FolderModel[] => {
    return items.filter(folder => {
        const { title } = folder;
        return title?.includes(search);
    });
};
