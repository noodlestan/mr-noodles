import { createSignal } from 'solid-js';

import { FoldersQueryContextState } from './types';

export const createFoldersQueryContext = (
    r?: string,
    p?: string,
    t?: string,
): FoldersQueryContextState => {
    const [parent, setParent] = createSignal<string | undefined>(p);
    const [root, setRoot] = createSignal<string | undefined>(r);
    const [textSearch, setTextSearch] = createSignal<string | undefined>(t);

    const context: FoldersQueryContextState = {
        parent,
        setParent,
        root,
        setRoot,
        textSearch,
        setTextSearch,
    };

    return context;
};
