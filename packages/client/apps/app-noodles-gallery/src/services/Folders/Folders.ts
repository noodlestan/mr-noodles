import type { FolderNoodle } from '@noodlestan/shared-types';
import { Accessor, createResource } from 'solid-js';

import { searchByParent, searchItems } from './private/utils';

import { fetchFolders } from '@/resources/Folder/fetchFolders';

type FoldersService = {
    loading: Accessor<boolean>;
    folders: () => FolderNoodle[];
    searchFolders: (parent?: string, search?: string) => FolderNoodle[];
    refetch: () => void;
    getFolderBySlug: (slug: string) => FolderNoodle | undefined;
};

export const createFoldersService = (): FoldersService => {
    const [resource, { refetch }] = createResource(fetchFolders);

    const loading = () => resource.loading;
    const folders = () => resource()?.data || [];

    const getFolderBySlug = () => {
        return {} as FolderNoodle;
    };

    const searchFolders = (parent?: string, search?: string) => {
        const folders_ = folders();
        const folders__ = parent !== undefined ? searchByParent(folders_, parent) : folders_;
        const filtered = search ? searchItems(folders__, search) : folders__;
        return filtered;
    };

    return {
        loading,
        folders,
        searchFolders,
        refetch,
        getFolderBySlug,
    };
};
