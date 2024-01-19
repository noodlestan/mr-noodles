import type { APIResponseMeta, FileNoodle, FileQuery } from '@noodlestan/shared-types';
import { Accessor, createSignal } from 'solid-js';

const [loading, setLoading] = createSignal<boolean>(false);
const [query, setQuery] = createSignal<FileQuery>({});
const [files, setFiles] = createSignal<FileNoodle[]>([]);
const [meta, setMeta] = createSignal<APIResponseMeta>({});

type PhotosStore = {
    loading: Accessor<boolean>;
    setLoading: (loading: boolean) => void;
    query: Accessor<FileQuery>;
    setQuery: (query: FileQuery) => void;
    files: Accessor<FileNoodle[]>;
    setFiles: (files: FileNoodle[]) => void;
    meta: Accessor<APIResponseMeta>;
    setMeta: (meta: APIResponseMeta) => void;
};

export const filesStore: PhotosStore = {
    loading,
    setLoading,
    query,
    setQuery,
    files,
    setFiles,
    meta,
    setMeta,
};
