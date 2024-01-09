import { createSignal } from 'solid-js';

import { QueryContext } from '@/providers/AlbumsQuery';

type AlbumsQueryService = {
    createQueryContext: (parent?: string, search?: string) => QueryContext;
};

const createQueryContext = (initialParent?: string, initialSearch?: string): QueryContext => {
    const [parent, setParent] = createSignal<string | undefined>(initialParent);
    const [searchTerms, setSearchTerms] = createSignal<string | undefined>(initialSearch);

    return { searchTerms, setSearchTerms, parent, setParent };
};

export const createAlbumsQueryService = (): AlbumsQueryService => {
    return {
        createQueryContext,
    };
};
