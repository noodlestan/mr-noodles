import { createContext } from 'solid-js';

import { FoldersNavigationContextState } from '../types';

export const FoldersNavigationContext = createContext<FoldersNavigationContextState>(
    {} as FoldersNavigationContextState,
);
