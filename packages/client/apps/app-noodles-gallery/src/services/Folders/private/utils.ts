import type { BaseNoodle, FolderNoodle } from '@noodlestan/shared-types';

export const matchNoodleByOwner = (noodle: BaseNoodle, ownerId?: string): boolean => {
    return noodle.owner === ownerId;
};

export const matchNoodleByRoot = (noodle: BaseNoodle, rootId: string): boolean => {
    return noodle.root === rootId;
};

export const matchRootFolders = (folder: FolderNoodle): boolean => {
    return folder.filename === '/';
};

export const matchFolderByParent = (
    folder: FolderNoodle,
    parent: string = '/',
    includeAllChildren?: boolean,
): boolean => {
    if (folder.filename === '/') {
        return false;
    }
    const isSubFolder = folder.filename.startsWith(parent) && folder.filename !== parent;
    if (!isSubFolder) {
        return false;
    }
    if (includeAllChildren) {
        return true;
    }
    const level = folder.filename.split('/').length;
    const parentLevel = parent === '/' ? 1 : parent.split('/').length;
    const isDirectChild = isSubFolder && level === parentLevel + 1;
    return isDirectChild;
};

export const matchFolderByChild = (folder: FolderNoodle, child: string): boolean => {
    const filename = child.split('/').slice(0, -1).join('/') || '/';
    return folder.filename === filename;
};

export const matchFolderByText = (folder: FolderNoodle, text: string): boolean => {
    // TODO folder titles
    const titleMatch = !!folder.title?.includes(text);
    if (titleMatch) {
        return true;
    }
    const dirname = folder.filename.split('/').pop() as string;
    return dirname.toLowerCase().includes(text.toLowerCase());
};
