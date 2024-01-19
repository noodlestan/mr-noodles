import type { FileNoodle, FileQuery } from '@noodlestan/shared-types';
import { Accessor } from 'solid-js';

import { filesStore } from './private/store';

import { fetchFiles } from '@/resources/File/fetchFiles';

type FilesService = {
    loading: Accessor<boolean>;
    query: Accessor<FileQuery>;
    setQuery: (filter: FileQuery) => void;
    files: Accessor<FileNoodle[]>;
};

export const createFilesService = (): FilesService => {
    const { loading, setLoading, query, setQuery, files, setFiles, setMeta } = filesStore;

    const queryNow = async (query: FileQuery) => {
        setQuery(query);
        setLoading(true);
        const { data, meta } = await fetchFiles(query);
        setFiles(data);
        setMeta(meta);
        setLoading(false);
    };

    return {
        loading,
        query,
        setQuery: queryNow,
        files,
    };
};
