import type { FileNoodle, FolderNoodle } from '@noodlestan/shared-types';
import { Accessor, createResource } from 'solid-js';

import { createMatcher } from '../../functions/createMatcher';
import { createPredicate } from '../../functions/createPredicate';
import { fetchFolders } from '../../resources/Folders/fetchFolders';

import {
    matchFolderByChild,
    matchFolderByParent,
    matchFolderByText,
    matchNoodleByOwner,
    matchNoodleByRoot,
    matchRootFolders,
} from './private/utils';

type FoldersService = {
    loading: Accessor<boolean>;
    folders: () => FolderNoodle[];
    searchFolders: (
        ownerId?: string,
        rootId?: string,
        parent?: string,
        text?: string,
    ) => FolderNoodle[];
    getFolderById: (id: string) => FolderNoodle | undefined;
    getFolderByFilename: (root: string, filename: string) => FolderNoodle | undefined;
    getFolderByChild: (file: FileNoodle | FolderNoodle) => FolderNoodle | undefined;
};

export const createFoldersService = (): FoldersService => {
    const [resource /* { refetch } */] = createResource(fetchFolders);

    const loading = () => resource.loading;
    const folders = () => resource()?.data || [];

    const searchFolders = (ownerId?: string, rootId?: string, parent?: string, text?: string) => {
        const folders_ = folders();

        const byOwner = createPredicate(matchNoodleByOwner, ownerId);
        const byRoot = !rootId || createPredicate(matchNoodleByRoot, rootId);
        const byParent = !rootId || createPredicate(matchFolderByParent, parent, !!text);
        const roots = !!rootId || !!text || (!parent && createPredicate(matchRootFolders));
        const byText = !text || createPredicate(matchFolderByText, text);

        const matcher = createMatcher<FolderNoodle>(byOwner, byRoot, byParent, roots, byText);
        return folders_.filter(matcher);
    };

    const getFolderByChild = (child: FileNoodle | FolderNoodle) => {
        return folders().find(
            folder =>
                matchNoodleByRoot(folder, child.root) && matchFolderByChild(folder, child.filename),
        );
    };

    const getFolderById = (id: string) => {
        return folders().find(folder => folder.id === id);
    };

    const getFolderByFilename = (root: string, filename: string) => {
        return folders().find(folder => folder.root === root && folder.filename === filename);
    };

    return {
        loading,
        folders,
        searchFolders,
        getFolderByChild,
        getFolderById,
        getFolderByFilename,
    };
};
